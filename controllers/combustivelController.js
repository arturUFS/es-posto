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
  /**
   * Cadastra um novo combustivel no banco de dados
   */
  async cadastrar(req, res) {
    try {
      const {
        tipocombustivel,
        valorlitro,
        qtddisponivel,
        descricao,
        cnpj,
      } = req.body;
      

      // Verifica se o CNPJ do fornecedor foi enviado corretamente
      if (!cnpj) {
        return res
          .status(400)
          .json({ message: "Selecione um fornecedor válido!" });
      }
      
      const idcombustivel = gerarIdCombustivel(); // Gerando um ID único para o combustivel

      //Cadastrar o combustível
      const novoCombustivel = await Combustivel.create({
        idcombustivel,
        tipocombustivel,
        valorlitro,
        descricao: descricao || null, //Permite que seja opcional
        qtddisponivel,
      });

      // cria a associação na tabela Fornecedor_combustivel
      await FornecedorCombustivel.create({
        cnpj: cnpj,
        idcombustivel,
      });

      res.json({
        message: "✅ Combustível cadastrado com sucesso!",
        combustivel: novoCombustivel,
      });
    } catch (error) {
      console.error(" ❌ Erro ao cadastrar combustível:", error);
      res.status(500).json({
        message: "Erro ao cadastrar combustível",
        error: error.message,
      });
    }
  },
};