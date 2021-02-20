const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/session')
const ProfileController = require('../app/controllers/profile')
const UserController = require('../app/controllers/user')
const ValidateController = require('../app/validators/session')
const { isLoggedRedirectToUsers, onlyUsers, onlyAdmin, isLoggedRedirectToAdmin } = require('../app/middlewares/session')

// Rotas para Login de usuários em geral e admin

routes.get('/users/login', UserController.loginForm)//Mostrar o formulário para logar
routes.post('/users', ValidateController.login, UserController.login)
// routes.get('/profile', ProfileController.logout) //Logout usuário
routes.get('/users/forgot-password', UserController.forgotpasswordForm)
// routes.post('/users', ValidateController.email, UserController.sendEmail)

// Rotas de perfil de um usuário logado

routes.get('/profile', ValidateController.show, ProfileController.show) // Mostrar o formulário com dados do usuário logado
routes.put('/profile', ProfileController.put)// Editar o usuário logado

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/users/register', UserController.registerForm) // Mostrar formulário dos usuários
routes.post('/users/create', ValidateController.create, UserController.post) //Cadastrar um usuário
routes.get('/users/list', UserController.list) //Mostrar a lista de usuários cadastrados
// routes.put('/users/edit', onlyAdmin, UserController.put) // Editar um usuário
// routes.delete('/users/delete', onlyAdmin, UserController.delete) // Deletar um usuário

module.exports = routes