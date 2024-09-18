// Import the inventory from the inventoryModel file
//And this contains the list of items and their stock levels which is the quantity
import { inventory } from '../models/inventoryModel';

// Import the OrderItem type from the orderModel file
// This defines the structure of an item in an order with itemId and quantity
import { OrderItem } from '../models/orderModel';

//This function  helps to check if there is enough stock for a specific item
// It then take the itemId  and quantity (how many units are needed) as arguments
const checkInventory = (itemId: number, quantity: number): boolean => {
    //This find the item in the inventory based on itemId
    const item = inventory.find(i => i.itemId === itemId);

    //It then return true if the item exists and has enough stock otherwise it  return false
    return item ? item.stock >= quantity : false;
};

//This function  helps to update the stock levels after an order is placed
// It takes an array of OrderItem objects as an argument
const updateStock = (items: OrderItem[]): void => {
    //And then loop through each item in the order
    items.forEach(item => {
        //This find the inventory item that matches the itemId from the order
        const inventoryItem = inventory.find(i => i.itemId === item.itemId);

        // If the item is found in the inventory it should  update its stock
        if (inventoryItem) {
            inventoryItem.stock -= item.quantity;  //This decrease the stock by the quantity ordered

            // If the stock is 0 or less it should  log a message indicating that the item is out of stock
            if (inventoryItem.stock <= 0) {
                console.log(`Item ${item.itemId} is out of stock.`);
            }
        }
    });
};

//You have to export the functions checkInventory and updateStock along with inventory
// This allows other files to use these functions and the inventory data
export { checkInventory, updateStock, inventory };
