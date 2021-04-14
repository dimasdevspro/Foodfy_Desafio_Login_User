const User = require("../models/User");
const { compare } = require("bcryptjs");
function verifyFormCreateUser(req, res, next) {
  const keys = Object.keys(req.body);
  for (key of keys) {
    if (req.body[key] == "") {
      res.send("Please, fill all fields!");
    }
  }
  let { password, passwordRepeat } = req.body;
  if (password != passwordRepeat)
    res.render("session/register", {
      user: req.body,
      error: "Senhas não conferem!",
    });
  next();
}

async function verifyLogin(req, res, next) {
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
      error: "Senha incorreta.",
    });

  req.user = user;
  next();
}

async function verifyLogged(req, res, next) {
  const { userId: id } = req.session;
  const user = await User.findOneUser({ where: { id } });
  if (!user)
    return res.render("session/index.njk", {
      error: "Usuário não encontrado!",
    });
  req.user = user;
  next();
}

async function existeEmail(req, res, next) {
  const { email } = req.body;
  const user = await User.findOneUser({ where: { email } });
  if (!user)
    return res.render("session/login", {
      user: req.body,
      error: "Usuário não cadastrado!",
    });
  req.user = user;
  next();
}

async function verifyDataForResetPassword(req, res, next) {
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
      error: "A senha e a repetição das senhas estão incorretas",
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
}

async function ifAdminInLogin(req, res, next) {
  if (req.session.is_admin == true) {
    const { userId: id } = req.session;
    const user = await User.findOneUser({ where: { id } });
    return res.render("session/index.njk", { user });
  } 
  next();
}
module.exports = {
  verifyFormCreateUser,
  verifyLogin,
  verifyLogged,
  existeEmail,
  verifyDataForResetPassword,
  ifAdminInLogin,
};
