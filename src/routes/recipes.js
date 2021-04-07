const express = require('express')
const routes = express.Router()
const recipesController = require('../app/controllers/recipes')
const searchController = require('../app/controllers/search')
const { onlyAdmin } = require('../app/middlewares/session')
const multer = require('../app/middlewares/multer')

//ADMIN RECIPES

routes.get('/search', searchController.index);
routes.get("/", recipesController.index); // Mostrar a lista de receitas
routes.get("/create", onlyAdmin, recipesController.create); // Mostrar formulário de nova receita
routes.post("/", onlyAdmin, multer.array("photos", 5), recipesController.post); // Cadastrar nova receita
routes.get("/:id", recipesController.show); // Exibir detalhes de uma receita
routes.get("/:id/edit", recipesController.edit); // Mostrar formulário de edição de receita
routes.put("/", onlyAdmin, multer.array("photos", 5), recipesController.put); // Editar uma receita
routes.delete("/", onlyAdmin, recipesController.delete); // Deletar uma receita


module.exports = routes