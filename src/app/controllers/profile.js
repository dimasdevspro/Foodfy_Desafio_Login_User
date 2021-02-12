

module.exports = {
    async loginForm(req, res) {
        
        res.render("session/login.njk")
    },
    async post(req, res){
         console.log(req.body)
        // const userId = await User.findOne(req.body)
        
        // req.session.userId = user_id
    
        // return res.redirect('session/login.njk')
        }
}