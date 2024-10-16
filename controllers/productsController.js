const pool = require("../db/pool")

module.exports = {
  getAllProducts: async (req, res) => {
    const products = await pool.query("SELECT * FROM products;")
    res.json(products.rows)
  },
  addProduct: async (req, res) => {
    const { name, quantity, price, category } = req.body
    await pool.query(
      "INSERT INTO products (name, quantity, price, category) VALUES ($1, $2, $3, $4)",
      [name, quantity, price, category]
    )
    const { rows } = await pool.query(
      "SELECT * FROM products WHERE name=$1 LIMIT 1",
      [name]
    )
    res.json(rows[0])
  },
  updateProduct: async (req, res) => {
    const { name, quantity, price, category } = req.body
    await pool.query(
      "UPDATE products SET name= $1, quantity=$2, price=$3, category=$4 WHERE id = $5;",
      [name, quantity, price, category, req.params.id]
    )
    res.json({ name, quantity, price, category, id: req.params.id })
  },
  deleteProduct: async (req, res) => {
    const { id } = req.params
    await pool.query("DELETE FROM products WHERE id=$1", [id])
    res.json(id)
  },
}
