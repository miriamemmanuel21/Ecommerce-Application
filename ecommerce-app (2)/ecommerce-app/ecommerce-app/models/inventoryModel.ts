//This defines the structure which is the type of the inventory item
// Each item in the inventory has an itemId and stock which is how many units are available
interface InventoryItem {
    itemId: number;  // The Id of the item
    stock: number;   // The number of units available in stock
}

//Firstly i created an array called inventory that holds all the items in the store
//And each item has an itemId and its available stock which is the quantity
const inventory: InventoryItem[] = [
    { itemId: 1, stock: 10 },  // Item with Id 1 has 10 units in stock
    { itemId: 2, stock: 9 },   // Item with Id 2 has 9 units in stock
    { itemId: 3, stock: 0 }    // Item with Id 3 has 0 units in stock which means that  it is out of stock
];

//You then export the inventory array so that other files can use this data
export { inventory };
