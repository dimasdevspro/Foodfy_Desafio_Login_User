const session = require('../validators/session')
const User = require('../models/User')

module.exports = {
    registerForm(req, res){

        res.render("session/register.njk")
    },
    async loginForm(req, res) {
        
        res.render("session/login.njk")
    },
    async post(req, res){
       
        const userId = await User.create(req.body)

        req.session.userId = userId
    
        return res.redirect('/admin/profile')
        }
}