const session = require('../validators/session')

module.exports = {
    registerForm(req, res){

        res.render("session/register.njk")
    },
    async post(req, res){
         console.log(req.body)
        // const userId = await User.create(req.body)
        
        // req.session.userId = user_id
    
        // return res.redirect('session/login.njk')
        }
}