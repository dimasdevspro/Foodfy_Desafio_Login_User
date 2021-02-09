const express = require('express')
const routes = express.Router()
const chefsController = require('../app/controllers/chefs')
const multer = require('../app/middlewares/multer')

//ADMIN CHEFS
 
routes.get("/", chefsController.index); // Mostrar a lista de chef
routes.get("/create", chefsController.create); // Mostrar formulário de novo chef
routes.get("/:id", chefsController.show); // Exibir detalhes de um chef
routes.get("/:id/edit", chefsController.edit); // Mostrar formulário de edição de um chef

routes.post("/", multer.array("photo", 1), chefsController.post); // Cadastrar novo chef
routes.put("/", multer.array("photo", 1), chefsController.put); // Editar um chef
routes.delete("/", chefsController.delete); // Deletar um chef

module.exports = routes