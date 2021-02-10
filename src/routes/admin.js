const express = require('express')
const routes = express.Router()

// const UserController = require('../app/controllers/user')
const ProfileController = require('../app/controllers/profile')
const UserController = require('../app/controllers/user')
const ValidateController = require('../app/validators/session')
// // Rotas de perfil de um usuário logado
// routes.get('/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
// routes.get('/profile', ProfileController.login) //Logar usuário
// routes.get('/profile', ProfileController.logout) //Logout usuário
// routes.put('/profile', ProfileController.put)// Editar o usuário logado

// // Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/user/register', UserController.registerForm) // Mostrar formulário do admin
routes.post('/user/create', ValidateController.create, UserController.post) //Cadastrar um usuário
routes.get('/user/login', UserController.loginForm) // Logar admin
// routes.get('/user/logout', UserController.logout) // Logaout admin
// routes.get('/user/list', UserController.list) //Mostrar a lista de usuários cadastrados
// routes.put('/user/edit', UserController.put) // Editar um usuário
// routes.delete('/user/delete', UserController.delete) // Deletar um usuário

module.exports = routes