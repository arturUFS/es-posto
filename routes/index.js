const express = require("express");
const router = express.Router();
const exemploController = require("../controllers/exemploController");
const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const funcionarioController = require("../controllers/funcionarioController");

router.get("/", exemploController.index);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", authController.login);

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login"); // Redireciona para a tela de login
  });
});

router.get("/home", homeController.index);

router.get("/combustivel", (req, res) => {
  const nomeFuncionario = req.query.nome || "Usuário";
  res.render("combustivel", { nomeFuncionario});
});

router.get("/produtos", (req, res) => {
  const nomeFuncionario = req.query.nome || "Usuário";
  res.render("produtos", { nomeFuncionario});
});

router.get("/funcionario", funcionarioController.index);


module.exports = router;
