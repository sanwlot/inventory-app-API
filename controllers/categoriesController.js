const pool = require("../db/pool")

module.exports = {
  getAllCategories: async (req, res) => {
    const categories = await pool.query("SELECT * FROM categories;")
    res.json(categories.rows)
  },

  addCategory: async (req, res) => {
    const { name } = req.body
    await pool.query("INSERT INTO categories (name) VALUES ($1)", [name])
    const { rows } = await pool.query(
      "SELECT * FROM categories WHERE name=$1 LIMIT 1",
      [name]
    )
    res.json(rows[0])
  },
  deleteCategory: async (req, res) => {
    const { id } = req.params
    /*
     this sql command added for deleting products from products table upon deletion of relvent category
      ALTER TABLE products
      ADD CONSTRAINT fk_category
      FOREIGN KEY (category_id)
      REFERENCES categories(id)
      ON DELETE CASCADE;
    */
    await pool.query("DELETE FROM categories WHERE id=$1", [id])
    res.json({ id })
  },
}
