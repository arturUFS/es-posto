import { Produto } from "../models/produto.js";
import { FornecedorProduto } from "../models/fornecedor_produto.js";
import { ItemVenda } from "../models/itemvenda.js";
import { Venda } from "../models/venda.js";
import { Funcionario } from "../models/funcionario.js";
import { Fornecedor } from "../models/fornecedor.js";

/**
 * Gera um ID único para o produto.
 */
function gerarIdProduto() {
  return Math.random().toString(36).substring(2, 17); // Gera um ID de 15 caracteres
}

/**
 * Gera um código único para a venda.
 */
function gerarCodigoVenda() {
  return Math.random().toString(36).substring(2, 17); // Gera um ID de 15 caracteres
}

export const produtoController = {
  index: async (req, res) => {
    try {
      const nomeFuncionario = req.query.nome || "Usuário";
      res.render("Produtos/produtos", { nomeFuncionario });
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao buscar usuários");
    }
  },

  /**
   * Cadastra um novo produto no banco de dados.
   */
  async cadastrar(req, res) {
    try {
      const { nome, quantidade, descricao, valor, fornecedor } = req.body;

      // Verifica se o CNPJ do fornecedor foi enviado corretamente
      if (!fornecedor) {
        return res
          .status(400)
          .json({ message: "Selecione um fornecedor válido!" });
      }

      // Gera um ID único para o produto
      const idproduto = gerarIdProduto();

      // Cadastrar o produto
      const novoProduto = await Produto.create({
        idproduto,
        nome,
        quantidade,
        descricao: descricao || null, // Permite que seja opcional
        valor,
      });

      // Cadastrar a relação fornecedor-produto
      await FornecedorProduto.create({
        cnpj: fornecedor,
        idproduto,
      });

      res.json({
        message: "Produto cadastrado com sucesso!",
        produto: novoProduto,
      });
    } catch (error) {
      console.error("❌ Erro ao cadastrar produto:", error);
      res.status(500).json({
        message: "Erro ao cadastrar produto",
        error: error.message,
      });
    }
  },

  async listar(req, res) {
    try {
      // Busca todos os produtos no banco de dados
      const produtos = await Produto.findAll({
        attributes: ["idproduto", "quantidade", "nome", "descricao", "valor"], // Apenas os campos necessários
      });

      // Retorna os produtos como JSON (para consumo no front-end)
      res.json(produtos);
    } catch (error) {
      console.error("❌ Erro ao listar produtos:", error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },

  /**
   * Registra uma nova venda de produto.
   */
  async registrarVenda(req, res) {
    try {
      const {
        data,
        idProduto,
        cpfFuncionario,
        quantidade,
        formaPagamento,
        valorTotal,
      } = req.body;

      // Verificar se o funcionário existe
      const funcionario = await Funcionario.findOne({
        where: { cpf: cpfFuncionario },
      });
      if (!funcionario) {
        return res.status(404).json({ message: "Funcionário não encontrado." });
      }

      // Verificar se o produto existe e se há estoque suficiente
      const produto = await Produto.findOne({
        where: { idproduto: idProduto },
      });
      if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado." });
      }

      if (produto.quantidade < quantidade) {
        return res.status(400).json({ message: "Estoque insuficiente." });
      }

      // Gerar um código único para a venda
      const codigoVenda = gerarCodigoVenda();

      // Criar a venda na tabela "venda"
      await Venda.create({
        codigo: codigoVenda,
        data,
        valor: valorTotal,
        cpf: cpfFuncionario,
        formapagamento: formaPagamento,
      });

      // Criar o item de venda na tabela "itemvenda"
      await ItemVenda.create({
        iditemvenda: gerarCodigoVenda(),
        idproduto: idProduto,
        quantidade,
        valor: valorTotal,
      });

      // Atualizar a quantidade do produto
      await produto.update({
        quantidade: produto.quantidade - quantidade,
      });

      res.json({ message: "Venda registrada com sucesso!" });
    } catch (error) {
      console.error("Erro ao registrar venda:", error);
      res
        .status(500)
        .json({ message: "Erro ao registrar venda.", error: error.message });
    }
  },

  /**
   * Consulta um produto pelo ID
   */
  async consultar(req, res) {
    try {
      const { idproduto } = req.params;

      // Buscar o produto pelo ID e incluir os fornecedores associados
      const produto = await Produto.findOne({
        where: { idproduto },
        include: [
          {
            model: Fornecedor,
            as: "fornecedores", // O alias definido na associação
            attributes: ["cnpj", "nome", "email", "telefone"], // Evita carregar dados desnecessários
            through: { attributes: [] }, // Remove a tabela intermediária da resposta
          },
        ],
      });

      if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      // Se houver fornecedores associados, pega o primeiro
      const fornecedor =
        produto.fornecedores.length > 0 ? produto.fornecedores[0] : null;

      res.json({
        idproduto: produto.idproduto,
        nome: produto.nome,
        descricao: produto.descricao,
        valor: produto.valor,
        quantidade: produto.quantidade,
        fornecedor: fornecedor ? fornecedor.nome : "Não informado",
      });
    } catch (error) {
      console.error("Erro ao consultar produto:", error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },
};
