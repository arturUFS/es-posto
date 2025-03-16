const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const authController = require("../controllers/authController");

router.get("/", homeController.index);

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

module.exports = router;
