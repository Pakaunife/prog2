const productDao = require('../dao/productDao');

exports.getAll = async (req, res) => {
  try {
    const products = await productDao.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei prodotti' });
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await productDao.getProductById(Number(req.params.id));
    if (product) res.json(product);
    else res.status(404).json({ error: 'Prodotto non trovato' });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero del prodotto' });
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const products = await productDao.getProductsByCategory(req.params.category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei prodotti per categoria' });
  }
};

exports.getByBrand = async (req, res) => {
  try {
    const products = await productDao.getProductsByBrand(req.params.brand);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei prodotti per brand' });
  }
};

exports.search = async (req, res) => {
  try {
    const products = await productDao.searchProducts(req.query.q || '');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Errore nella ricerca prodotti' });
  }
};

exports.getVetrina = async (req, res) => {
  try {
    const prodotti = await productDao.getVetrinaProducts();
    res.json(prodotti);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei prodotti in vetrina' });
  }
};
