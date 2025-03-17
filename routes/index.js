const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const authController = require("../controllers/authController");
const exemploController = require("../controllers/exemploController");
const authMiddleware = require("../middlewares/authMiddleware");

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

router.get("/home", (req, res) => {
  const nomeFuncionario = req.query.nome || "Usuário"; // Se não tiver nome, usa 'Usuário'
  res.render("home", { nomeFuncionario });
});

router.get("/page_combustivel", (req, res) => {
  const nomeFuncionario = req.query.nome || "Usuário";
  res.render("page_combustivel", { nomeFuncionario});
});

router.get("/page_produtos", (req, res) => {
  const nomeFuncionario = req.query.nome || "Usuário";
  res.render("page_produtos", { nomeFuncionario});
});

router.get("/page_funcionario", (req, res) => {
  const nomeFuncionario = req.query.nome || "Usuário";
  res.render("page_funcionario", { nomeFuncionario});
});


module.exports = router;
