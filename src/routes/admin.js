const express = require("express");
const routes = express.Router();

const ProfileController = require("../app/controllers/profile");
const UserController = require("../app/controllers/user");
const ValidateController = require("../app/validators/session");
const { onlyAdmin } = require("../app/middlewares/session");

routes.get("/users/login", ValidateController.ifAdminInLogin, UserController.loginForm);
routes.post("/users", ValidateController.verifyLogin, UserController.login);
routes.get("/users/forgot-password", UserController.forgotpasswordForm);
routes.post(
  "/users/forgot-password",
  ValidateController.existeEmail,
  UserController.sendEmailByRecoveryPassword
);
routes.get("/users/password-reset", UserController.resetPasswordForm);
routes.post(
  "/users/password-reset",
  ValidateController.verifyDataForResetPassword,
  UserController.resetPassword
);

routes.get("/profile", ValidateController.verifyLogged, ProfileController.showProfile);
routes.get("/profile/:id/edit", onlyAdmin, UserController.editUserForm);
routes.put("/profile", ProfileController.putProfile);
routes.post("/logout", ProfileController.logout);

routes.get("/users/register", onlyAdmin, UserController.registerFormUser);
routes.post(
  "/users/create",
  onlyAdmin,
  ValidateController.verifyFormCreateUser,
  UserController.postNewUser
);
routes.get("/users/list", onlyAdmin, UserController.listUsers);
routes.put("/users/edit", onlyAdmin, UserController.putUser);
routes.delete("/users/delete", onlyAdmin, UserController.deleteUser);

module.exports = routes;
