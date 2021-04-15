const express = require("express");
const routes = express.Router();
const recipesController = require("../app/controllers/recipes");
const admin = require("./admin");
const chefs = require("./chefs");
const recipes = require("./recipes");

routes.get("https://foodfy-dap.herokuapp.com/", recipesController.home);

routes.use("https://foodfy-dap.herokuapp.com/admin", admin);
routes.use("https://foodfy-dap.herokuapp.com/chefs", chefs);
routes.use("https://foodfy-dap.herokuapp.com/recipes", recipes);

routes.get("https://foodfy-dap.herokuapp.com/about", recipesController.aboutSite);

module.exports = routes;
