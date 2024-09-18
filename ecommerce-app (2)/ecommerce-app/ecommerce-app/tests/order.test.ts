// // @ts-ignore
// import { createOrder } from '../controllers/orderController';
// // @ts-ignore
// import { checkInventory, updateStock, inventory } from '../service/inventory';
//
// // Mock the inventory service functions
// jest.mock('../service/inventory');
//
// // Define types for the items
// interface InventoryItem {
//     itemId: number;
//     stock: number;
// }
//
// interface OrderItem {
//     itemId: number;
//     quantity: number;
// }
//
// // Define the inventory as an array of InventoryItem
// const inventory: InventoryItem[] = [
//     { itemId: 1, stock: 10 },
//     { itemId: 2, stock: 5 },
//     { itemId: 3, stock: 0 }
// ];
//
// // Run this code before each test
// beforeEach(() => {
//     // Reset stock values for items
//     inventory.forEach(item => {
//         if (item.itemId === 1) {
//             item.stock = 10; // Reset stock for item 1 to 10
//         }
//         if (item.itemId === 3) {
//             item.stock = 0; // Set item 3 stock to 0
//         }
//     });
//
//     // Mock the checkInventory function
//     (checkInventory as jest.Mock).mockImplementation((itemId: number, quantity: number): boolean => {
//         const item = inventory.find(item => item.itemId === itemId);
//         return item ? item.stock >= quantity : false;
//     });
//
//     // Mock the updateStock function
//     (updateStock as jest.Mock).mockImplementation((items: OrderItem[]): void => {
//         items.forEach(({ itemId, quantity }) => {
//             const item = inventory.find(item => item.itemId === itemId);
//             if (item) {
//                 item.stock -= quantity; // Reduce the stock for the item
//             }
//         });
//     });
// });
//
// // Test: Create a valid order
// test('create a valid order', () => {
//     const customerId = 123;
//     const items: OrderItem[] = [{ itemId: 1, quantity: 2 }];
//     const order = createOrder(customerId, items);
//
//     // Check if order was created correctly
//     expect(order).toHaveProperty('orderId');
//     expect(order.customerId).toBe(customerId);
//     expect(order.items).toEqual(items);
// });
//
// // Test: Fail to create an order due to insufficient stock
// test('fail to create an order due to insufficient stock', () => {
//     const customerId = 123;
//     const items: OrderItem[] = [{ itemId: 3, quantity: 1 }]; // Item 3 is out of stock
//     expect(() => createOrder(customerId, items)).toThrow('Error: Item 3 does not have enough stock.');
// });
//
// // Test: Update stock after an order
// test('update stock after an order', () => {
//     const customerId = 123;
//     const items: OrderItem[] = [{ itemId: 1, quantity: 2 }];
//     createOrder(customerId, items);
//
//     // Check that the stock has been reduced
//     const updatedItem = inventory.find(i => i.itemId === 1);
//     expect(updatedItem?.stock).toBe(8); // Stock should be 8 after order
// });
