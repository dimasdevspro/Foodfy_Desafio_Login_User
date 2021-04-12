const express = require("express");
const routes = express.Router();
const chefsController = require("../app/controllers/chefs");
const multer = require("../app/middlewares/multer");
const { onlyAdmin } = require("../app/middlewares/session");

routes.get("/", chefsController.index);
routes.get("/create", onlyAdmin, chefsController.create);
routes.get("/:id", chefsController.show);
routes.get("/:id/edit", onlyAdmin, chefsController.edit);

routes.post("/", onlyAdmin, multer.array("photo", 1), chefsController.post);
routes.put("/", onlyAdmin, multer.array("photo", 1), chefsController.put);
routes.delete("/", onlyAdmin, chefsController.delete);

module.exports = routes;
