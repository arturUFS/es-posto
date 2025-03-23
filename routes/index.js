import express from "express";
import { exemploController } from "../controllers/exemploController.js";
import { authController } from "../controllers/authController.js";
import { homeController } from "../controllers/homeController.js";
import { funcionarioController } from "../controllers/funcionarioController.js";
import { combustivelController } from "../controllers/combustivelController.js";
import { produtoController } from "../controllers/produtoController.js";
import { servicoController } from "../controllers/servicoController.js";
import { fornecedorController } from "../controllers/fornecedorController.js";
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

router.get("/servicos", servicoController.index);

//Rotas Funcionário

router.get("/funcionario", funcionarioController.index);

// Rota para cadastrar funcionário
router.post("/funcionario/cadastrar", funcionarioController.cadastrar);

// Rota para consultar funcionário pelo CPF
router.get("/funcionario/consultar/:cpf", funcionarioController.consultar);

// Rota para atualizar um funcionário pelo CPF
router.put("/funcionario/atualizar/:cpf", funcionarioController.atualizar);

// Rota para excluir um funcionário pelo CPF
router.delete("/funcionario/excluir/:cpf", funcionarioController.excluir);

// Rota para listar funcionários
router.get("/funcionario/listar", funcionarioController.listar);

// Rotas Fornecedor

router.get("/fornecedores", fornecedorController.index);

// Rota para cadastrar Forneccedor
router.post("/fornecedores/cadastrar", fornecedorController.cadastrar);

// Rota para consultar fornecedor pelo CNPJ
router.get("/fornecedores/consultar/:cnpj", fornecedorController.consultar);

// Rota para atualizar um fornecedor pelo CNPJ
router.put("/fornecedores/atualizar/:cnpj", fornecedorController.atualizar);

// Rota para excluir um fornecedor pelo CNPJ
router.delete("/fornecedores/excluir/:cnpj", fornecedorController.excluir);

// Rota para listar fornecedores
router.get("/fornecedores/listar", fornecedorController.listar);

// Rotas Produto

router.get("/produtos", produtoController.index);

// Rota para cadastrar um produto
router.post("/produto/cadastrar", produtoController.cadastrar);

// Rota para listar produtos
router.get("/produto/listar", produtoController.listar);

// Rota para registrar venda de um produto
router.post("/produto/registrar", produtoController.registrarVenda);

// Rota para consultar um produto
router.get("/produto/consultar/:idproduto", produtoController.consultar);

export default router;
