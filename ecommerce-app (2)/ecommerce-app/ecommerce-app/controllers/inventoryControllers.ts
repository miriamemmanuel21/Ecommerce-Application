// Import the inventory model from another file
// This will give you access to the list of items and their stock levels
import { inventory } from "../models/inventoryModel";

//Then you define the structure which is the type of an order item
// Each item in an order has an itemId and quantity (how many units the customer wants to buy)
interface OrderItem {
    itemId: number;  // The Id of the item
    quantity: number;  // How many units of this item are being ordered
}

// Define the structure which is the type of an order
// An order contains an orderId, customerId, and a list of items that the customer is ordering
interface Order {
    orderId: string;  // A unique identifier for the order
    customerId: number;  // The ID of the customer placing the order
    items: OrderItem[];  // A list (array) of items in the order
}

//You then create an empty array to store all orders placed by customers
const orders: Order[] = [];

//This function  is to check if there's enough stock of an item
// It takes the itemId and quantity that  the customer wants to buy and returns true if there is enough stock
const checkInventory = (itemId: number, quantity: number): boolean => {
    //I used  optional chaining to safely access the stock of the item
    //and if  the item doesn't exist, the default stock will be 0
    return (inventory[itemId]?.stock || 0) >= quantity;
};

//This function  helps to update the stock of items after an order is placed
//It then  loops through each item in the order and reduces its stock in the inventory
const updateStock = (items: OrderItem[]): void => {
    items.forEach(item => {
        //This checks if the item exists in the inventory
        if (inventory[item.itemId] !== undefined) {
            //Then reduce the stock of the item by the quantity ordered
            inventory[item.itemId].stock -= item.quantity;

            // If the stock goes down to 0 or below,it should log a message  that say's  the item is out of stock
            if (inventory[item.itemId].stock <= 0) {
                console.log(`Item ${item.itemId} is out of stock.`);
            }
        }
    });
};

//You then export the functions checkInventory and updateStock,
// as well as the inventory object and orders array so that other files can use them
export { checkInventory, updateStock, inventory, orders };
