const session = require('../validators/session')
const User = require('../models/User')

module.exports = {
    registerForm(req, res){

        res.render("session/register.njk")
    }, 
    async login(req, res){

        req.session.userId = req.user.id

        return res.redirect('/admin/profile')
    },
    async post(req, res){
       
        const userId = await User.create(req.body)

        req.session.userId = userId
    
        return res.redirect('/admin/users/login')
        },
        async loginForm(req, res) {
            
            res.render("session/login.njk")
        },
        async list(req, res){

            let users = await User.findAll()

            console.log(users)
            return res.render('session/list.njk')
        },
        forgotpasswordForm(req, res){

            return res.render('session/forgot-password.njk')
        }

}