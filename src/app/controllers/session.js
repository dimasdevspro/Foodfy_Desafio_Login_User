const crypto = require("crypto");
const mailer = require("../../lib/mailer");
const User = require("../models/User");
const { hash } = require("bcryptjs");
module.exports = {
  login(req, res) {
    try {
    req.session.userId = req.user.id;
    req.session.is_admin = req.user.is_admin;
    return res.redirect("/users");  
    } catch (err) {
      console.error(err)
    }   
  },
  loginForm(req, res) {
    try {
      return res.render("session/login");
    } catch (err) {
      console.error(err)
    }
  },
  logout(req, res) {
    try {
      req.session.destroy();
      return res.redirect("/");
    } catch (error) {
    }
  },
  forgotForm(req, res) {
    try {
      return res.render("session/forgot-password");
    } catch (err) {
      console.error(err)
    }
  },
  async forgot(req, res) {
    const user = req.user;
    try {
      const token = crypto.randomBytes(20).toString("hex");
      let now = new Date();
      now = now.setHours(now.getHours() + 1);
      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now,
      });
      await mailer.sendMail({
        to: user.email,
        from: "no-reply@launchstore.com.br",
        subject: "Recuperação de senha",
        html: ` <h2>Perdeu a chave?</h2>
    <p>Não se preocupe, clique no link abaixo para recuperar sua senha</p>
    <p>
    
    <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
    RECUPERAR SENHA</a>
    </p>`,
      });
      return res.render("session/forgot-password", {
        success: "Verifique seu email para resetar sua senha!",
      });
    } catch (err) {
      console.error(err);
      return res.render("session/forgot-password", {
        error: "Erro inesperado, tente novamente!",
      });
    }
  },
  resetForm(req, res) {
    try {
      return res.render("session/password-reset", { token: req.query.token });
    } catch (err) {
      console.error(err)
    }
  },
  async reset(req, res) {
    const user = req.user;
    const { password, token } = req.body;
    try {
      const newPassword = await hash(password, 8);
      await User.update(user.id, {
        password: newPassword,
        reset_token: "",
        reset_token_expires: "",
      });
      return res.render("session/login", {
        user: req.body,
        success: "Senha atualizada! Faça seu login!",
      });
    } catch (err) {
      console.error(err);
      return res.render("session/password-reset", {
        user: req.body,
        token,
        error: "Erro inesperado, tente novamente!",
      });
    }
  },
};
