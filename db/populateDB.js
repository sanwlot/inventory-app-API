const { Client } = require("pg")
require("dotenv").config()

const SQL = `
DROP TABLE categories, products, suppliers,product_supplier;
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  quantity INTEGER,
  price INTEGER,
  category VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS suppliers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS product_supplier (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id INTEGER,
  supplier_id INTEGER
);

INSERT INTO categories (name) 
VALUES
  ('Graphics Card'),
  ('Gaming Console'),
  ('Laptop');

INSERT INTO products (name, quantity, price, category) 
VALUES
  ('RTX 4070', 3, 899, 'Graphics Card'),
  ('PS5 PRO', 12, 799, 'Gaming Console'),
  ('MACBOOK PRO M4', 8, 1999, 'Laptop');

INSERT INTO suppliers (name)
VALUES
  ('TechSupplier Inc.'),
  ('GadgetWorld'),
  ('Hardware Hub');

  INSERT INTO product_supplier (product_id, supplier_id)
  VALUES
    (1, 1), 
    (1, 2), 
    (2, 3), 
    (3, 1), 
    (3, 2); 
`

async function main() {
  console.log("seeding...")
  const client = new Client({
    // connectionString: process.env.PG_CONNECTION_STRING,
    connectionString:
      "postgresql://ajaysanwlot:sylvia@localhost:5432/inventory_app",
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log("done")
}

main()
