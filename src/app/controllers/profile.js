const User = require("../models/User");
module.exports = {
  async showProfile(req, res) {
    try {
      const { user } = req;
      req.session.is_admin = user.is_admin;
      return res.render("session/profile", { user });
    } catch (err) {
      console.error(err);
    }
  },
  async putProfile(req, res) {
    try {
      let { name, email, is_admin } = req.body;
      if(is_admin == on){
        is_admin == true
      } else{
        is_admin == false
      }
      console.log(is_admin)
      // await User.update(req.body.id, {
      //   name,
      //   email,
      //   is_admin,
      // });
      // return res.render("session/profile", {
      //   user: req.body,
      //   success: "Conta atualizada com sucesso!",
      // });
    } catch (err) {
      return res.render("session/profile", {
        error: "Algum erro aconteceu!",
      });
    }
  },
  logout(req, res) {
    try{
      req.session.destroy();
      return res.redirect("/admin/users/login");
    }catch(err){
      console.error(err)
    }
  }
};
