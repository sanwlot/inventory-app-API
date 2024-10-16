const { Router } = require("express")
const pool = require("../db/pool")
const categoriesController = require("../controllers/categoriesController")
const categoriesRouter = Router()

categoriesRouter.get("/", categoriesController.getAllCategories)
categoriesRouter.post("/", categoriesController.addCategory)

module.exports = categoriesRouter
