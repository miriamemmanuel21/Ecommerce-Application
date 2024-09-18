// I imported the Router function from Express
// Router is used to create routes for handling different requests
import { Router } from 'express';

// I import the createOrder function from the orderController file
// This function will handle the creation of orders when a request is made to the corresponding route
import { createOrder } from '../controllers/orderController';

//I created a new router instance using the Router function
// This router will be used to define routes for the application
const router = Router();

//Then you define a POST route for creating orders
// When a POST request is sent to /create, the createOrder function will be called
router.post('/create', createOrder);

//You then Export the router so it can be used in other parts of the application
export default router;
