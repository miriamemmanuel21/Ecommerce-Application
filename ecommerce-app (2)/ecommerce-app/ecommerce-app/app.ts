import express from 'express';
import orderRoutes from './routes/orderRoutes';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the imported routes
app.use('/api/order', orderRoutes);

// Define a basic route for testing
app.get('/', (req, res) => {
    res.send('Hello, World!\n');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
