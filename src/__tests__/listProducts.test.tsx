import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ShoppingCartContext } from '../context/CartProvider';
import { useNavigate } from 'react-router-dom';
import ListProducts from '../listProducts';

const mockAddItem = jest.fn();
const mockSetItems = jest.fn();
const mockRemoveItem = jest.fn();
const mockIncrementQuantity = jest.fn();
const mockDecrementQuantity = jest.fn();

const mockShoppingCartContext = {
    addItem: (item: any) => {
        mockShoppingCartContext.items.push(item);
        mockAddItem(item);
    },
    items: [] as any[],
    incrementQuantity: (id: number) => {
        mockShoppingCartContext.items = mockShoppingCartContext.items.map((item: any) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            } else {
                return item;
            }
        });
        mockIncrementQuantity(id);
    },
    decrementQuantity: (id: number) => {
        mockShoppingCartContext.items = mockShoppingCartContext.items.map((item: any) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity - 1 };
            } else {
                return item;
            }
        });
        mockDecrementQuantity(id);
    },
    setItems: (items: React.SetStateAction<any[]>) => {
        mockShoppingCartContext.items = typeof items === 'function'
            ? items(mockShoppingCartContext.items)
            : items;
        mockSetItems(items);
    },
    removeItem: (item: any) => {
        mockShoppingCartContext.items = mockShoppingCartContext.items.filter((i: any) => i !== item);
        mockRemoveItem(item);
    }
};

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('ListProducts Component', () => {

    let mockItem: any;

    beforeEach(() => {
        mockItem = [
            { id: 1, name: 'Product 1', price: 10.99, quantity: 1 },
            { id: 2, name: 'Product 2', price: 9.99, quantity: 1 },
            { id: 3, name: 'Product 3', price: 7.99, quantity: 1 },
        ];

        mockShoppingCartContext.items = mockItem;
    });


    test('renders list of products', () => {
        render(
            <ShoppingCartContext.Provider value={mockShoppingCartContext}>
                <ListProducts />
            </ShoppingCartContext.Provider>
        );


        mockShoppingCartContext.items.forEach((product) => {
            expect(screen.getByText(`${product.name} - ${product.price}`)).toBeInTheDocument()
        });
    });

    test('calls addItem and navigates to cart when "Add to cart" button is clicked', () => {
        jest.useFakeTimers();

        const mockNavigate = jest.fn();

        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

        const { getByTestId } = render(
            <ShoppingCartContext.Provider value={mockShoppingCartContext}>
                <ListProducts />
            </ShoppingCartContext.Provider>
        );

        mockShoppingCartContext.items.forEach((product) => {

            mockShoppingCartContext.items = [];
            const addToCartButton = getByTestId(`add-to-cart-${product.id}`);
            expect(addToCartButton).toBeInTheDocument();

            fireEvent.click(addToCartButton);

            expect(mockAddItem).toHaveBeenCalledWith({ ...product });

            expect(mockShoppingCartContext.items).toEqual([product]);

            jest.runAllTimers();

            expect(mockNavigate).toHaveBeenCalledWith('/cart');
        });

        jest.useRealTimers();
    });
});