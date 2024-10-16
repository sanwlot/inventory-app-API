const pool = require("../db/pool")

module.exports = {
  getAllCategories: async (req, res) => {
    const categories = await pool.query("SELECT * FROM categories;")
    res.json(categories.rows)
  },

  addCategory: async (req, res) => {
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
}
