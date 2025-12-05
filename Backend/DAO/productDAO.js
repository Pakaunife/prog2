const { getConnection, execute } = require('../connection/DB');

class ProductDao {
  async getAllProducts() {
    const connection = await getConnection();
    const sql = 'SELECT * FROM products';
    const products = await execute(connection, sql, []);
    connection.done();
    return products;
  }

  async getProductById(id) {
    const connection = await getConnection();
    const sql = 'SELECT * FROM products WHERE id = $1';
    const products = await execute(connection, sql, [id]);
    connection.done();
    return products[0];
  }

  async getProductsByCategory(category) {
    const connection = await getConnection();
    const sql = 'SELECT * FROM products WHERE category = $1';
    const products = await execute(connection, sql, [category]);
    connection.done();
    return products;
  }

  async getProductsByBrand(brand) {
    const connection = await getConnection();
    const sql = 'SELECT * FROM products WHERE brand = $1';
    const products = await execute(connection, sql, [brand]);
    connection.done();
    return products;
  }

  async searchProducts(query) {
    const connection = await getConnection();
    const sql = `SELECT * FROM products WHERE 
      LOWER(name) LIKE $1 OR LOWER(description) LIKE $1`;
    const products = await execute(connection, sql, [`%${query.toLowerCase()}%`]);
    connection.done();
    return products;
  }
  
  async getVetrinaProducts() {
  const connection = await getConnection();
  const sql = 'SELECT * FROM products WHERE in_vetrina = true AND bloccato = false';
  const prodotti = await execute(connection, sql, []);
  connection.done();
  return prodotti;
}
}

module.exports = new ProductDao();