//First i imported the  necessary modules and functions from other files
// Request and Response are types from Express to handle HTTP requests and responses
// The checkInventory and updateStock are functions to manage the stock of items in the inventory
import { Request, Response } from 'express';
import { checkInventory, updateStock } from '../services/inventory';
import { orders } from '../models/orderModel';

//You first define the structure which is the  type of an item in an order
// Each item in an order has an itemId and a quantity
interface OrderItem {
    itemId: number;  // ID of the item the customer wants to order
    quantity: number;  //Then how many units of this item the customer wants to buy
}

// This define the structure  which is the type for the data that the client the user or system sends when creating an order
// This data includes customerId and a list of items the customer wants to order
interface CreateOrderRequestBody {
    customerId: string;  // The Id of the customer placing the order
    items: OrderItem[];  // An array (list) of items in the order
}

//This function  generates a unique order ID for each new order
// It uses the current time (in milliseconds) to ensure that each order gets a unique Id
const generateOrderId = (): string => {
    return 'ORD' + Date.now();  // ORD is added as a prefix, followed by the current timestamp
};

// This is the main function that handles creation of  an order
// and it receives the order details from the HTTP request (via 'req') and sends a response (via 'res')
const createOrder = (req: Request, res: Response): void => {
    //This extract's  customerId and items from the body of the request
    // These are the details of the order that the customer is trying to place
    const { customerId, items }: CreateOrderRequestBody = req.body;

    //This then check if the customerId is provided if not it then returns  an error response.
    if (!customerId) {
        res.status(400).json({
            status: "error",
            message: "Customer ID is required."  // Error message  say's if the customer ID is missing
        });
        return;  //Then this stop's further execution
    }

    //This loops through each item in the order to validate the item detail
    for (const item of items) {
        const { itemId, quantity } = item;  // Get itemId and quantity for each item

        //This checks if the itemId is provided for each item and if not it then  returns an error response
        if (!itemId) {
            res.status(400).json({
                status: "error",
                message: "Each item must have an itemId."  //And the error message is itemId is missing
            });
            return;  //This stops further execution
        }

        //This check if quantity is provided and if it's greater than 0
        if (!quantity || quantity <= 0) {
            res.status(400).json({
                status: "error",
                message: `Invalid quantity for item ${itemId}. Quantity must be greater than 0`,
                itemId
            });
            return;  //This stop's further execution if the quantity is invalid
        }

        //This check if there is enough stock for the item
        if (!checkInventory(itemId, quantity)) {
            res.status(400).json({
                status: "error",
                message: `Item ${itemId} does not have enough stock.`,
                itemId
            });
            return;  //This stop's further execution if there is not enough stock
        }
    }

    // If all the items are valid, it then create a new order
    const order = {
        orderId: generateOrderId(),  //This generate a unique order Id
        customerId,  //You then use the customer ID from the request
        items  //And also use the list of items from the request
    };

    //This add the new order to the orders array (which stores all the orders)
    orders.push(order);

    //This updates the stock of the items in the inventory
    updateStock(items);

    //This send a success response back to the client with details of the created order
    res.status(201).json({
        status: "success",
        message: "Order created successfully.",
        order  //This includes the created order details in the response
    });
};

//This export the createOrder function so that it can be used in other parts of the application
export { createOrder };
