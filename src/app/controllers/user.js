
module.exports = {
    login(req, res) {

        res.render("session/login.njk")
    },
    registerForm(req, res){

        res.render("session/register.njk")
    }
}