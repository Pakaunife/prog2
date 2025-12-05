const express = require('express');
const app = express();
const path = require('path');


const PORT = 3000;

app.use('/images/prodotti', express.static(path.join(__dirname, 'immagini/prodotti')));


// Middleware per parsing JSON
app.use(express.json());


const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});