const User = require('../models/User')

module.exports = {
    
        logout(req, res){
            req.session.destroy()

            return res.redirect('/')
        },
   
    async index(req, res){
       
        res.render('session/index.njk')
    }
}