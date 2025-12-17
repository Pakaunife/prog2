const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');



app.use(cors({
  origin: 'http://localhost:4200', // consenti solo il frontend
  credentials: true
}));


const PORT = 3000;

app.use('/images/prodotti', express.static(path.join(__dirname, 'immagini/prodotti')));


// Middleware per parsing JSON
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const indirizziRoutes = require('./routes/indirizziRoutes');





app.use('/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/indirizzi', indirizziRoutes);

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});