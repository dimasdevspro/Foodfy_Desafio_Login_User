const crypto = require("crypto");
const User = require("../models/User");
const mailer = require("../../lib/mailer");
const { hash } = require("bcryptjs");
module.exports = {
  registerFormUser(req, res) {
    try {
    const userAdmin = req.session;
    res.render("session/register.njk", { userAdmin });
    } catch (err) {
      console.error(err)
    }
  },
  async loginForm(req, res) {
    try {
      res.render("session/login.njk");
    } catch (err) {
      console.error(err)
    }
  },
  async login(req, res) {
    try {
      req.session.userId = req.user.id;
      return res.redirect("/admin/profile");
    } catch (err) {
      console.error(err)
    }
  },
  async listUsers(req, res) {
    try {
      const user = req.session;
      const usersComuns = await User.findAllUsers();
      return res.render("session/list.njk", { usersComuns, user });
    } catch (err) {
      console.error(err)
    }
  },
  async editUserForm(req, res) {
    try {
      const id = req.params.id;
      let user = await User.findOneUser({ where: { id } });
      const userAdmin = req.session;
      return res.render("session/edit.njk", { user, userAdmin }); 
    } catch (err) {
      console.error(err)
    }
  },
  async postNewUser(req, res) {
    try {
   const userId = await User.create(req.body);
    req.session.userId = userId;
    return res.redirect("/admin/users/list");   
    } catch (err) {
      console.log(err)
    }
  },
  forgotpasswordForm(req, res) {
    try {
      return res.render("session/forgot-password.njk");
    } catch (err) {
      console.error(err)
    }
  },
  async putUser(req, res) {
    try {
      let { name, email, is_admin } = req.body;
      if (is_admin == undefined) {
        is_admin = false;
      } else {
        is_admin = true;
      }
      await User.update(req.body.id, {
        name,
        email,
        is_admin,
      });
      const usersComuns = await User.findAllUsers();
      const userAdmin = req.session;
      return res.render("session/list", {
        usersComuns,
        userAdmin,
        success: "Conta atualizada com sucesso!",
      });
    } catch (err) {
      return res.render("session/list", {
        usersComuns,
        userAdmin,
        error: "Algum erro aconteceu!",
      });
    }
  },
  async deleteUser(id) {
    try {
      await User.delete(req.body.id);
      return res.render("session/list", {
        success: "Conta deletada com sucesso!",
      });
    } catch (err) {
      console.error(err);
      return res.render("session/list", {
        user: req.body,
        error: "Erro ao tentar deletar sua conta!",
      });
    }
  },
  async sendEmailByRecoveryPassword(req, res) {
    const user = req.user;
    try {
      const token = crypto.randomBytes(20).toString("hex");
      let now = new Date();
      now = now.setHours(now.getHours() + 1);
      await User.update(user.id, {
        reset_token: token,
        reset_token_experies: now,
      });
      await mailer.sendMail({
        to: user.email,
        from: "no-reply@foodfy.com.br",
        subject: "Recuperação de senha",
        html: ` <h2>Perdeu a chave?</h2>
    <p>Não se preocupe, clique no link abaixo para recuperar sua senha</p>
    <p>
    
    <a href="http://localhost:3000/admin/users/password-reset?token=${token}" target="_blank">
    RECUPERAR SENHA</a>
    </p>`,
      });
      return res.render("session/login", {
        success: "Verifique seu email para resetar sua senha!",
      });
    } catch (err) {
      console.error(err);
      return res.redirect("session/login", {
        error: "Erro inesperado, tente novamente!",
      });
    }
  },
  async resetPasswordForm(req, res) {
    try {
      let reset_token = req.query.token;
    const user = await User.findOneUser({ where: { reset_token } });
    return res.render("session/password-reset.njk", {
      token: req.query.token,
      user,
    });
    } catch (err) {
      console.error(err)
    }
  },
  async resetPassword(req, res) {
    const user = req.user;
    const { password, token } = req.body;
    console;
    try {
      const newPassword = await hash(password, 8);
      await User.update(user.id, {
        password: newPassword,
        reset_token: "",
        reset_token_experies: "",
      });
      return res.render("session/login", {
        user: req.body,
        sucess: "Senha atualizada! Faça seu login!",
      });
    } catch (err) {
      console.error(err);
      return res.redirect("session/password-reset", {
        user: req.body,
        token,
        error: "Erro inesperado, tente novamente!",
      });
    }
  },
};
