const User = require('../models/User')

module.exports = {
    async post(req, res){

        req.session.userId = req.user.id
    
        return res.redirect('/admin/profile')
    },
    async index(req, res){
        
        res.render('session/index.njk')
    }
}