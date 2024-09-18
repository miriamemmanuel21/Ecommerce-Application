// @ts-ignore
import { checkInventory, createOrder, updateStock, inventory, orders } from '../inventoryController';

// Reset inventory and orders before each test
beforeEach(() => {
    inventory[0].stock = 10; // Item ID 1 stock reset
    inventory[1].stock = 5;  // Item ID 2 stock reset
    inventory[2].stock = 0;  // Item ID 3 stock reset
    orders.length = 0;       // Clear orders
});

describe('Inventory Management Tests', () => {
    // Test for Function 1: checkInventory
    describe('checkInventory', () => {
        test('should return true when enough stock is available', () => {
            expect(checkInventory(1, 5)).toBe(true);
        });

        test('should return false when not enough stock is available', () => {
            expect(checkInventory(1, 15)).toBe(false);
        });

        test('should return false when the item is out of stock', () => {
            expect(checkInventory(3, 1)).toBe(false);
        });
    });

    // Test for Function 2: createOrder
    describe('createOrder', () => {
        test('should create an order for valid items in stock', () => {
            const order = createOrder(45, [
                { itemId: 1, quantity: 2 },
                { itemId: 2, quantity: 1 },
            ]);
            expect(order).toEqual({
                orderId: expect.any(String), // Use expect.any for dynamic IDs
                customerId: 45,
                items: [
                    { itemId: 1, quantity: 2 },
                    { itemId: 2, quantity: 1 },
                ],
            });
        });

        test('should return error when an item is out of stock', () => {
            const order = createOrder(45, [
                { itemId: 1, quantity: 2 },
                { itemId: 3, quantity: 1 },
            ]);
            expect(order).toEqual({
                error: 'Item 3 is out of stock or insufficient stock.',
            });
        });

        test('should return error when there is not enough stock', () => {
            const order = createOrder(45, [{ itemId: 1, quantity: 12 }]);
            expect(order).toEqual({
                error: 'Item 1 is out of stock or insufficient stock.',
            });
        });
    });

    // Test for Function 3: updateStock
    describe('updateStock', () => {
        afterEach(() => {
            jest.clearAllMocks(); // Clear mocks after each test
        });

        test('should reduce stock correctly after an order', () => {
            updateStock([{ itemId: 1, quantity: 5 }, { itemId: 2, quantity: 3 }]);
            expect(inventory[0].stock).toBe(5); // 10 - 5 = 5
            expect(inventory[1].stock).toBe(2); // 5 - 3 = 2
        });

        test('should log when an item goes out of stock', () => {
            console.log = jest.fn(); // Mock console.log
            updateStock([{ itemId: 2, quantity: 5 }]); // This should set item 2 stock to 0
            expect(inventory[1].stock).toBe(0); // Check if stock is now 0
            expect(console.log).toHaveBeenCalledWith('Item 2 is out of stock.');
            // @ts-ignore
            console.log.mockRestore(); // Restore console.log after test
        });
    });
});
