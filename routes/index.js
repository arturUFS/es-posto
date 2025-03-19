import express from "express";
import {exemploController} from "../controllers/exemploController.js";
import {authController} from "../controllers/authController.js";
import {homeController} from "../controllers/homeController.js";
import {funcionarioController} from "../controllers/funcionarioController.js";
import {combustivelController} from "../controllers/combustivelController.js";
import {produtoController} from "../controllers/produtoController.js";
import {servicoController} from "../controllers/servicoController.js";
import {fornecedorController} from "../controllers/fornecedorController.js";
const router = express.Router();

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

router.get("/combustivel", combustivelController.index);

router.get("/produtos", produtoController.index);

router.get("/servicos", servicoController.index);

router.get("/funcionario", funcionarioController.index);

router.get("/fornecedores", fornecedorController.index);


export default router;