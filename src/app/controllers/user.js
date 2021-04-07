const crypto = require('crypto')
const User = require('../models/User')
const mailer = require('../../lib/mailer')

module.exports = {
    registerForm(req, res){

        res.render("session/register.njk")
    }, 
    async login(req, res){

        req.session.userId = req.user.id

        return res.redirect('/admin/profile')
    },
    async list(req, res){

             const user = req.session
        
             const usersComuns = await User.findAll()
             
             return res.render('session/list.njk', {usersComuns, user})
        },
    async editUser(req, res){  
       
        const id = req.params.id
        
        let user = await User.findOne({where: {id}})
        
        const userAdmin = req.session

        return res.render('session/edit.njk', {user, userAdmin})
    },
    async post(req, res){
        
        const userId = await User.create(req.body)

        req.session.userId = userId
    
        return res.redirect('/admin/users/list')
        },
    async loginForm(req, res) {
            
            res.render("session/login.njk")
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

                const usersComuns = await User.findAll()
                
                const userAdmin = req.session

                return res.render("session/list", {
                    usersComuns,
                    userAdmin,
                    success: "Conta atualizada com sucesso!"
                })
            }   catch(err){
               
                return res.render("session/list", {
                    usersComuns,
                    userAdmin,
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
    },
    async sendEmail(req, res){
        const user = req.user
        try {
// um token para esse usuário
const token = crypto.randomBytes(20).toString("hex")


// criar um expiração
let now = new Date()
now = now.setHours(now.getHours() + 1)


await User.update(user.id, {
    reset_token: token,
    reset_token_experies: now
})


// enviar um email com um link de recuperação de senha
await mailer.sendMail({
    to: user.email,
    from: 'no-reply@foodfy.com.br',
    subject: 'Recuperação de senha',
    html: ` <h2>Perdeu a chave?</h2>
    <p>Não se preocupe, clique no link abaixo para recuperar sua senha</p>
    <p>
    
    <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
    RECUPERAR SENHA</a>
    </p>`
})

// avisar o usuário que enviamos o email
return res.render("session/login", {
    success: "Verifique seu email para resetar sua senha!"
})
        }catch(err){
            console.error(err)
            return res.redirect("session/login", {
                error: "Erro inesperado, tente novamente!"
            })
        }
    },
    resetPasswordForm(req, res){
            return res.render('session/password-reset.njk', {token: req.query.token})
    },
    resetPassword(req, res){
        const {email, password, passwordRepeat, token} = req.body

        try{
            //procurar o usuário que
            

            //ver se a senha birthDate


            //verificar se o token expirou


            //verificar se o token no expirou


            //cria um novo hash de senhas

            //atualiza o usuário que


            //avisa o usuário que ele tem uma nova senha

        }catch(err){
            console.error(err)
            return res.redirect("session/password-reset", {
                error: "Erro inesperado, tente novamente!"
            })
        }

    }

}