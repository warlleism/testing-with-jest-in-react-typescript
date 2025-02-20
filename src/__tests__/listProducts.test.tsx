import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ShoppingCartContext } from '../context/CartProvider';
import { useNavigate } from 'react-router-dom';
import ListProducts from '../pages/listProducts';

const mockAddItem = jest.fn(); //cria funções simuladas
const mockSetItems = jest.fn();
const mockNavigate = jest.fn();
const mockRemoveItem = jest.fn();
const mockIncrementQuantity = jest.fn();
const mockDecrementQuantity = jest.fn();

const mockShoppingCartContext = {

    items: [] as any[],

    addItem: (item: any) => {
        mockShoppingCartContext.items.push(item);
        mockAddItem(item);
    },

    setItems: (items: any) => {
        mockShoppingCartContext.items = items;
        mockSetItems(items);
    },

    removeItem: (item: any) => {
        mockShoppingCartContext.items = mockShoppingCartContext.items.filter((i: any) => i !== item);
        mockRemoveItem(item);
    },

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
        jest.useFakeTimers(); //para setTimeout, setInterval, setImmediate

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

            expect(mockAddItem).toHaveBeenCalledWith(product);

            expect(mockShoppingCartContext.items).toEqual([product]);

            jest.runAllTimers(); //para setTimeout, setInterval, setImmediate

            expect(mockNavigate).toHaveBeenCalledWith('/cart');
        });

        jest.useRealTimers(); // Quando você ativou timers falsos (jest.useFakeTimers();) e quer voltar para os timers normais.
    });
});