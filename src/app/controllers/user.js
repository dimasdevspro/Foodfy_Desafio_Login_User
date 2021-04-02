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
    async editUser(req, res){
        
        const id = req.params.id
        
        let user = await User.findOne({where: {id}})
        
        return res.render('session/edit.njk', {user})
    },
    async post(req, res){
       
        const userId = await User.create(req.body)

        req.session.userId = userId
    
        return res.redirect('/admin/users/list')
        },
    async loginForm(req, res) {
            
            res.render("session/login.njk")
        },
    async list(req, res){

             const usersComuns = await User.findAll()
            
             return res.render('session/list.njk', {usersComuns})
        },
    forgotpasswordForm(req, res){

            return res.render('session/forgot-password.njk')
        },
    async put(req, res) {
        try {
            
                let { name, email, is_admin} = req.body
               
                if (is_admin == undefined){
                    is_admin = false
                }else {
                    is_admin = true
                }

                await User.update(req.body.id, {
                    name,
                    email,
                    is_admin
                })
    
                return res.render("session/index", {
                    user: req.body,
                    is_admin: req.session.is_admin,
                    success: "Conta atualizada com sucesso!"
                })
            }   catch(err){
               
                return res.render("session/index", {
                    error: "Algum erro aconteceu!"
                })
            }    
    },
    async delete(id){

        try{
           
            await User.delete(req.body.id)
            
            return res.render("session/list", {
                
                success: "Conta deletada com sucesso!"
            })

        }catch(err){
            console.error(err)
            return res.render("session/list", {
                user: req.body,
                error: "Erro ao tentar deletar sua conta!"
            })
        }
    }

}