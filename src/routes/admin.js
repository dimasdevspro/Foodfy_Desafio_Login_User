const express = require("express");
const routes = express.Router();

const ProfileController = require("../app/controllers/profile");
const UserController = require("../app/controllers/user");
const ValidateController = require("../app/validators/session");
const { onlyAdmin } = require("../app/middlewares/session");

routes.get("/users/login", UserController.loginForm);
routes.post("/users", ValidateController.login, UserController.login);
routes.get("/users/forgot-password", UserController.forgotpasswordForm);
routes.post(
  "/users/forgot-password",
  ValidateController.email,
  UserController.sendEmail
);
routes.get("/users/password-reset", UserController.resetPasswordForm);
routes.post(
  "/users/password-reset",
  ValidateController.resetPassword,
  UserController.resetPassword
);

routes.get("/profile", ValidateController.show, ProfileController.show);
routes.get("/profile/:id/edit", onlyAdmin, UserController.editUser);
routes.put("/profile", ProfileController.put);
routes.post("/logout", ProfileController.logout);

routes.get("/users/register", onlyAdmin, UserController.registerForm);
routes.post(
  "/users/create",
  onlyAdmin,
  ValidateController.create,
  UserController.post
);
routes.get("/users/list", onlyAdmin, UserController.list);
routes.put("/users/edit", onlyAdmin, UserController.put);
routes.delete("/users/delete", onlyAdmin, UserController.delete);

module.exports = routes;
