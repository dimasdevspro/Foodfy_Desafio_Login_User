const User = require('../models/User')
const { compare } = require('bcryptjs')

async function create(req, res, next){
     //validando se todos os campos estão preenchidos
     const keys = Object.keys(req.body)
     for (key of keys){
         if(req.body[key] == "") {
             res.send("Please, fill all fields!")
         }
     }
     
     const {password, passwordRepeat} = req.body

     if (password =! passwordRepeat) res.render("user/register", {
         user: req.body,
         error:"Usuário não cadastrado!"
     })

     req.user = user

     next()
}

module.exports = {
    create
}