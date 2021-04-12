const express = require("express");
const routes = express.Router();
const recipesController = require("../app/controllers/recipes");
const admin = require("./admin");
const chefs = require("./chefs");
const recipes = require("./recipes");

routes.get("/", recipesController.home);

routes.use("/admin", admin);
routes.use("/chefs", chefs);
routes.use("/recipes", recipes);

routes.get("/about", recipesController.about);

module.exports = routes;
