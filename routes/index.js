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

router.get("/produtos", produtoController.index);

//--------------Rotas Funcionário--------------

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

// Rota para listar funcionários na tabela
router.get("/funcionario/listagem", funcionarioController.listarFuncionarios);

// --------------Rotas Fornecedor--------------

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

// Rota para listar fornecedores na tabela
router.get("/fornecedores/listagem", fornecedorController.listarFornecedores);

//--------------Rotas Combustível--------------

router.get("/combustivel", combustivelController.index);

//Rota para cadastrar combustível
router.post("/combustivel/cadastrar", combustivelController.cadastrar);

//Rota para registrar venda de combustível

router.post(
  "/combustivel/registrarvenda",
  combustivelController.registrarVenda
);

// Rota para listar combustível

router.get("/combustivel/listar", combustivelController.listar);

// Rota para atualizar preço de um combustível

router.put(
  "/combustivel/atualizarPreco/:idcombustivel",
  combustivelController.atualizarPreco
);

// Rota para listar os combustíveis e fornecedores
router.get("/combustivel/listagem", combustivelController.listarCombustiveis);

// --------------Rotas Produto--------------

router.get("/produtos", produtoController.index);

// Rota para cadastrar um produto
router.post("/produtos/cadastrar", produtoController.cadastrar);

// Rota para listar produtos
router.get("/produtos/listar", produtoController.listar);

// Rota para registrar venda de um produto
router.post("/produtos/registrar", produtoController.registrarVenda);

// Rota para consultar um produto
router.get("/produtos/consultar/:idproduto", produtoController.consultar);

//Rota para atualizar um produto
router.put("/produtos/atualizar/:idproduto", produtoController.atualizar);

//Rota para excluir um produto
router.delete("/produtos/excluir/:idproduto", produtoController.excluir);

// Rota para gerar relatório de venda de produtos
//router.get("/produtos/relatorio", produtoController.listar);

// Rota para listar os combustíveis e fornecedores
router.get("/produtos/listagem", produtoController.listarprodutos);

//-------------Rotas Servicos--------------

router.get("/servicos", servicoController.index);

//Rota para cadastrar servico
router.post("/servico/cadastrar", servicoController.cadastrar);

//Rota para agendar servico
router.post("/servico/agendarservico",servicoController.agendar_servico);

//Rota para listar serviços
router.get("/servico/listar", servicoController.listar);

//Rota para consultar agendamentos
router.get("servicos/listar_agendamentos", servicoController.listar_agendamentos);

// Rota para consultar agendamento específico
router.get("/servicos/agendamentos/:idagendamento", servicoController.consultar);

// Rota para gerar relatório de serviços
router.get("/servicos/relatorio", servicoController.gerarRelatorioServicos);

export default router;
