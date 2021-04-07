const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/session')
const ProfileController = require('../app/controllers/profile')
const UserController = require('../app/controllers/user')
const ValidateController = require('../app/validators/session')
const { onlyAdmin } = require('../app/middlewares/session')

// Rotas para Login de usuários em geral e admin

routes.get('/users/login', UserController.loginForm)//Mostrar o formulário login
routes.post('/users', ValidateController.login, UserController.login)//Envio dos dados de Login
routes.get('/users/forgot-password', UserController.forgotpasswordForm)//Formulário de resgate de senha
// routes.post('/users', ValidateController.email, UserController.sendEmail)

// Rotas de perfil de um usuário logado

routes.get('/profile', ValidateController.show, ProfileController.show) // Mostrar o formulário com dados do usuário logado
routes.get('/profile/:id/edit', onlyAdmin, UserController.editUser)// Editar formúlario do usuário
routes.put('/profile', ProfileController.put)// Editar o usuário logado
routes.post('/logout', ProfileController.logout) //Logout usuário

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/users/register', onlyAdmin, UserController.registerForm) // Mostrar formulário dos usuários
routes.post('/users/create', onlyAdmin, ValidateController.create, UserController.post) //Cadastrar um usuário
routes.get('/users/list', onlyAdmin, UserController.list) //Mostrar a lista de usuários cadastrados
routes.put('/users/edit', onlyAdmin, UserController.put) // Editar um usuário
routes.delete('/users/delete', onlyAdmin, UserController.delete) // Deletar um usuário

module.exports = routes