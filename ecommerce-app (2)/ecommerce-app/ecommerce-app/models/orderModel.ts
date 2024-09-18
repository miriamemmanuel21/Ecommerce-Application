//You frist define the structure which is the type for an item in an order
//And each item in an order has an itemId and a quantity
interface OrderItem {
    itemId: number;    // Thi is the  Id of the item being ordered
    quantity: number;  //And how many units(quantity) of this item are being ordered
}

//This defines the structure which is the type for an order
// An order contains an orderId,customerId, and a list of items
interface Order {
    orderId: string;         // The  unique Id for the order
    customerId: string;      // The Id of the customer who placed the order
    items: OrderItem[];      // A list of items included in the order
}

//I created an empty array called order to store all orders
// As orders are created they will be added to this array
let orders: Order[] = [];

//This export the order array, the OrderItem and Order interfaces
// so that other files can use them
export { orders, OrderItem, Order };
