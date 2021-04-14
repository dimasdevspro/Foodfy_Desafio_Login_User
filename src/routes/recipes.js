const express = require("express");
const routes = express.Router();
const recipesController = require("../app/controllers/recipes");
const searchController = require("../app/controllers/search");
const { onlyAdmin } = require("../app/middlewares/session");
const multer = require("../app/middlewares/multer");

routes.get("/search", searchController.indexRecipes);
routes.get("/", recipesController.indexRecipesHome);
routes.get("/create", onlyAdmin, recipesController.createRecipe);
routes.post("/", onlyAdmin, multer.array("photos", 5), recipesController.postNewRecipe);
routes.get("/:id", recipesController.showRecipe);
routes.get("/:id/edit", recipesController.editRecipe);
routes.put("/", onlyAdmin, multer.array("photos", 5), recipesController.putRecipe);
routes.delete("/", onlyAdmin, recipesController.deleteRecipe);

module.exports = routes;
