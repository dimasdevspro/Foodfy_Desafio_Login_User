const express = require("express");
const routes = express.Router();
const recipesController = require("../app/controllers/recipes");
const searchController = require("../app/controllers/search");
const { onlyAdmin } = require("../app/middlewares/session");
const multer = require("../app/middlewares/multer");

routes.get("/search", searchController.index);
routes.get("/", recipesController.index);
routes.get("/create", onlyAdmin, recipesController.create);
routes.post("/", onlyAdmin, multer.array("photos", 5), recipesController.post);
routes.get("/:id", recipesController.show);
routes.get("/:id/edit", recipesController.edit);
routes.put("/", onlyAdmin, multer.array("photos", 5), recipesController.put);
routes.delete("/", onlyAdmin, recipesController.delete);

module.exports = routes;
