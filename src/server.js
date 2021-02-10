const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes")
const methodOverride = require('method-override')
const server = express();

server.use(express.urlencoded({ extended: true}))
server.use(express.static("public"));
server.use(express.static("assets"));
server.use(methodOverride('_method'))
server.use(routes)

server.set("view engine", "njk");

const folders = ["src/app/views"]
nunjucks.configure(folders, {express: server})

routes.use(function (req, res) {
  return res.status(404).render("not-found");
});

server.listen(3338, function () {
  console.log("Server is running!");
});

