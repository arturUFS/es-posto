import { Produto } from "../models/produto.js";
import { FornecedorProduto } from "../models/fornecedor_produto.js";

/**
 * Gera um ID único para o produto.
 */
function gerarIdProduto() {
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
};
