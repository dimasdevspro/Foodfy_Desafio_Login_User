const User = require("../models/User");
const { compare } = require("bcryptjs");
function verifyFormCreateUser(req, res, next) {
  try {
   const keys = Object.keys(req.body);
  for (key of keys) {
    if (req.body[key] == "") {
      res.send("Por favor, preencha todos os campos!");
    }
  }
  let { password, passwordRepeat } = req.body;
  if (password != passwordRepeat)
    res.render("session/register", {
      user: req.body,
      error: "Senhas não conferem!",
    });
  next();  
  } catch (err) {
    console.error(err)
  }
}

async function verifyLogin(req, res, next) {
  try {
  const { name, password } = req.body;
  const user = await User.findOneUser({ where: { name } });
  if (!user)
    return res.render("session/login", {
      user: req.body,
      error: "Usuário não cadastrado!",
    });
  const passed = await compare(password, user.password);
  if (!passed)
    return res.render("session/login", {
      user: req.body,
      error: "Senha incorreta!",
    });

  req.user = user;
  next();  
  } catch (err) {
    console.error(err)
  }
}

async function verifyLogged(req, res, next) {
  try {
  const { userId: id } = req.session;
  const user = await User.findOneUser({ where: { id } });
  if (!user)
    return res.render("session/profile.njk", {
      error: "Usuário não cadastrado!"
    });
  req.user = user;
  next();  
  } catch (err) {
    console.error(err)
  }
}

async function existeEmail(req, res, next) {
  try {
  const { email } = req.body;
  const user = await User.findOneUser({ where: { email } });
  if (!user)
    return res.render("session/forgot-password", {
      user: req.body,
      error: "Usuário não cadastrado!",
    });
  req.user = user;
  next();  
  } catch (err) {
    console.error(err)
  }
}

async function verifyDataForResetPassword(req, res, next) {
  try {
    const { email, password, passwordRepeat, token } = req.body;
    const user = await User.findOneUser({ where: { email } });
    if (!user)
      return res.render("session/password-reset", {
        user: req.body,
        token,
        error: "Usuário não cadastrado!",
      });
    if (password != passwordRepeat)
      return res.render("session/reset-password", {
        user: req.body,
        token,
        error: "A senha e a repetição da senha estão incorretas",
      });
    if (token != user.reset_token)
      return res.render("session/password-reset", {
        user: req.body,
        error: "Token inválido! Solicite uma nova recuperação de senha...",
      });
    let now = new Date();
    now = now.setHours(now.getHours());
    if (now > user.reset_token_experies)
      return res.render("session/password-reset", {
        user: req.body,
        error: "Token expirado... solicite uma nova recuperação de senha...",
      });
    req.user = user;
    next();  
  } catch (err) {
    console.error(err)
  }
}

async function ifAdminInLogin(req, res, next) {
  try {
  if (req.session.is_admin == true) {
    const { userId: id } = req.session;
    const user = await User.findOneUser({ where: { id } });
    return res.render("session/profile.njk", { user });
  } 
  next();  
  } catch (err) {
    console.error(err)
  }
  
}
module.exports = {
  verifyFormCreateUser,
  verifyLogin,
  verifyLogged,
  existeEmail,
  verifyDataForResetPassword,
  ifAdminInLogin,
};
