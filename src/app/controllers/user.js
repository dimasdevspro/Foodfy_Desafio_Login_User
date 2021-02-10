const User = require("../../../../../Projeto_Launchstore_Acess_User/src/app/models/User")

module.exports = {
    loginForm(req, res) {

        res.render("session/login.njk")
    },
    registerForm(req, res){

        res.render("session/register.njk")
    },
    post(req, res){
       
        //gravando os dados no db
console.log(req.body)
    //    User.create(req.body)
    }
}