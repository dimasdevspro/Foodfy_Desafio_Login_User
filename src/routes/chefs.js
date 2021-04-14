const express = require("express");
const routes = express.Router();
const chefsController = require("../app/controllers/chefs");
const multer = require("../app/middlewares/multer");
const { onlyAdmin } = require("../app/middlewares/session");

routes.get("/", chefsController.indexChefs);
routes.get("/create", onlyAdmin, chefsController.createForm);
routes.get("/:id", chefsController.showChef);
routes.get("/:id/edit", onlyAdmin, chefsController.editChef);

routes.post("/", onlyAdmin, multer.array("photo", 1), chefsController.postNewChef);
routes.put("/", onlyAdmin, multer.array("photo", 1), chefsController.putChef);
routes.delete("/", onlyAdmin, chefsController.deleteChef);

module.exports = routes;
