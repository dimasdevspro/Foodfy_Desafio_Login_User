const User = require('../models/User')
const { compare } = require('bcryptjs')


function create(req, res, next){
    //  validando se todos os campos estão preenchidos
   
     const keys = Object.keys(req.body)

     for (key of keys){
         if(req.body[key] == "") {
           
             res.send("Please, fill all fields!")
         }
     }
     
     let {password, passwordRepeat} = req.body

     if (password != passwordRepeat) res.render("session/register", {
         user: req.body,
         error:"Senhas não conferem!"
     })
      
     next()
}

async function login(req, res, next){

    const { name, password } = req.body

    const user = await User.findOne({where: {name}})

    if (!user) return res.render("session/login", {
        user: req.body,
        error: "Usuário não cadastrado!"
    })

    const passed = await compare(password, user.password)
   
    if(!passed) return res.render("session/login", {
        user: req.body,
        error: "Senha incorreta."
    })

    req.user = user
   
    next()

}

async function show (req, res, next) {
const { userId: id} =  req.session

const user = await User.findOne({where: {id}})

if (!user) return res.render("session/index.njk", {
    error: "Usuário não encontrado!"
})

req.user = user

next()
}

async function email (req, res, next){

    const { email } = req.body
    
    const user = await User.findOne({where: {email}})

    if (!user) return res.render("session/login", {
        user: req.body,
        error: "Usuário não cadastrado!"
    })
    req.user = user

    next()
}
module.exports = {
    create,
    login,
    show,
    email
}