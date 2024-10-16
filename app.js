const express = require("express")
const cors = require("cors")
const categoriesRouter = require("./routes/categoriesRouter")
const productsRouter = require("./routes/productsRouter")
const app = express()
const PORT = 5252

app.use(cors())
app.use(express.json())

app.use("/categories", categoriesRouter)
app.use("/products", productsRouter)

app.listen(PORT, () => console.log(`Listening at port: ${PORT}`))
