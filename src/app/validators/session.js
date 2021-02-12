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

     if (password =! passwordRepeat) res.render("user/register", {
         user: req.body,
         error:"Senhas não conferem!"
     })
        
    //  req.user = user
    //  next()
}

async function login(req, res, next){

    const { email, password } = req.body

    const user = await User.findOne({where: {email}})

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


module.exports = {
    create,
    login
}