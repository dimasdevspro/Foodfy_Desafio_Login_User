const express = require('express')
const routes = express.Router()
const chefsController = require('../app/controllers/chefs')
const multer = require('../app/middlewares/multer')
const { onlyAdmin } = require('../app/middlewares/session')

//ADMIN CHEFS
 
routes.get("/", chefsController.index); // Mostrar a lista de chef
routes.get("/create", onlyAdmin, chefsController.create); // Mostrar formulário de novo chef
routes.get("/:id", chefsController.show); // Exibir detalhes de um chef
routes.get("/:id/edit", onlyAdmin,  chefsController.edit); // Mostrar formulário de edição de um chef

routes.post("/", onlyAdmin, multer.array("photo", 1), chefsController.post); // Cadastrar novo chef
routes.put("/", onlyAdmin, multer.array("photo", 1), chefsController.put); // Editar um chef
routes.delete("/", onlyAdmin, chefsController.delete); // Deletar um chef

module.exports = routes