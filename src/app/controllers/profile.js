const User = require("../models/User");
module.exports = {
  async showProfile(req, res) {
    try {
      const { user } = req;
      req.session.is_admin = user.is_admin;
      return res.render("session/index", { user });
    } catch (err) {
      console.error(err);
    }
  },
  async putProfile(req, res) {
    try {
      let { name, email, is_admin } = req.body;
      await User.update(req.body.id, {
        name,
        email,
        is_admin,
      });
      return res.render("session/index", {
        user: req.body,
        success: "Conta atualizada com sucesso!",
      });
    } catch (err) {
      return res.render("session/index", {
        error: "Algum erro aconteceu!",
      });
    }
  },
  logout(req, res) {
    req.session.destroy();
    return res.redirect("/admin/users/login");
  }
};
