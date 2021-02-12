const express = require('express')
const routes = express.Router()

const ProfileController = require('../app/controllers/profile')
const UserController = require('../app/controllers/user')
const ValidateController = require('../app/validators/session')
const { isLoggedRedirectToUsers, onlyUsers, onlyAdmin, isLoggedRedirectToAdmin } = require('../app/middlewares/session')


// // Rotas de perfil de um usuário logado
routes.get('/profile', ProfileController.loginForm)//Mostrar o formulário para logar
routes.post('/profile', ValidateController.login, ProfileController.post)
// routes.get('/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
// routes.get('/profile', ProfileController.logout) //Logout usuário
// routes.put('/profile', ProfileController.put)// Editar o usuário logado

// // Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/user/register', UserController.registerForm) // Mostrar formulário do admin
routes.post('/user/create', ValidateController.create, UserController.post) //Cadastrar um usuário
// routes.get('/user/list', UserController.list) //Mostrar a lista de usuários cadastrados
// routes.put('/user/edit', onlyAdmin, UserController.put) // Editar um usuário
// routes.delete('/user/delete', onlyAdmin, UserController.delete) // Deletar um usuário

module.exports = routes