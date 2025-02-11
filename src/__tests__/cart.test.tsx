import '@testing-library/jest-dom';

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


describe('ShoppingCart Quantity Manipulation', () => {
    let mockItem: any;

    beforeEach(() => {
        mockItem = { id: 1, name: 'Test Product', price: 10, quantity: 1 };
        mockShoppingCartContext.items = [mockItem];
    });

    test('incrementQuantity increases item quantity by 1', () => {
        mockShoppingCartContext.incrementQuantity(mockItem.id);

        expect(mockIncrementQuantity).toHaveBeenCalledWith(mockItem.id);
        const updatedItem = mockShoppingCartContext.items.find(item => item.id === mockItem.id);
        expect(updatedItem?.quantity).toBe(2);
    });

    test('decrementQuantity decreases item quantity by 1', () => {
        mockItem.quantity = 2;
        mockShoppingCartContext.items = [mockItem];

        mockShoppingCartContext.decrementQuantity(mockItem.id);

        expect(mockDecrementQuantity).toHaveBeenCalledWith(mockItem.id);
        const updatedItem = mockShoppingCartContext.items.find(item => item.id === mockItem.id);
        expect(updatedItem?.quantity).toBe(1);
    });



});