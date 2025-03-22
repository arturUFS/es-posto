import { Combustivel } from "../models/combustivel.js";
import { Fornecedor } from "../models/fornecedor.js";
import { FornecedorCombustivel } from "../models/fornecedor_combustivel.js";
import { Abastecimento } from "../models/abastecimento.js";

function gerarIdCombustivel() {
  return Math.random().toString(36).substring(2, 17); // Gera um ID de 15 caracteres
}

function gerarIdAbastecimento() {
  return Math.random().toString(36).substring(2, 17); // Gera um ID de 15 caracteres
}

export const combustivelController = {
  index: async (req, res) => {
    try {
      const nomeFuncionario = req.query.nome || "Usuário";
      res.render("Combustivel/combustivel", { nomeFuncionario });
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao buscar usuários");
    }
  },

  async cadastrar(req, res) {
    try {
      const { tipocombustivel, valorlitro, descricao, qtddisponivel, cnpj } =
        req.body;

      // verifica se o fornecedor existe antes de cadastrar o combustível
      const fornecedorExiste = await Fornecedor.findByPk(cnpj);
      if (!fornecedorExiste) {
        throw new Error("Fornecedor não encontrado.");
      }

      const idCombustivel = gerarIdCombustivel(); // Gerando um ID único para o combustivel

      const novoCombustivel = await Combustivel.create({
        idcombustivel: idCombustivel,
        tipocombustivel,
        valorlitro,
        descricao,
        qtddisponivel,
      });

      // cria a associação na tabela Fornecedor_combustivel
      await Fornecedor_combustivel.create({
        cnpj: combustivel.cnpj,
        idCombustivel: idCombustivel,
      });

      res.json({
        message: "Combustível cadastrado com sucesso!",
        combustivel: novoCombustivel,
      });

    } catch (error) {
      console.error("Erro ao cadastrar combustível:", error);
      res.status(500).json({
        message: "Erro ao cadastrar combustível",
        error: error.message,
      });
    }
  },
};