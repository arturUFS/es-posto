import { Combustivel } from "../models/combustivel.js";
import { FornecedorCombustivel } from "../models/fornecedor_combustivel.js";
import { Abastecimento } from "../models/abastecimento.js";
import { Funcionario } from "../models/funcionario.js";
import { Venda } from "../models/venda.js";

function gerarIdCombustivel() {
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
        tipo: tipocombustivel,
        valorLitro: valorlitro,
        quantidadeDisponivel: qtddisponivel,
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
      console.log("Novo combustível cadastrado:", novoCombustivel);

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

  /**
   * Registra uma venda de combustível.
   */
  async registrarVenda(req, res) {
    try {
      const {
        dataReg,
        cpfFuncionario,
        litros,
        idCombustivel,
        bomba,
        formaPagamento,
        valorTotal,
      } = req.body;

      // ✅ Validação dos campos obrigatórios
      if (
        !dataReg ||
        !cpfFuncionario ||
        !litros ||
        !idCombustivel ||
        !bomba ||
        !formaPagamento ||
        !valorTotal
      ) {
        console.log(dataReg);
        console.log(cpfFuncionario);
        console.log(litros);
        console.log(idCombustivel);
        console.log(bomba);
        console.log(formaPagamento);
        console.log(valorTotal);
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios!" });
      }

      // ✅ Verificar se o funcionário existe
      const funcionario = await Funcionario.findByPk(cpfFuncionario);
      if (!funcionario) {
        return res.status(404).json({ message: "Funcionário não encontrado!" });
      }

      // ✅ Verificar se o combustível existe
      const combustivel = await Combustivel.findByPk(idCombustivel);
      if (!combustivel) {
        return res.status(404).json({ message: "Combustível não encontrado!" });
      }

      // ✅ Verificar se há estoque suficiente
      if (combustivel.qtddisponivel < litros) {
        return res
          .status(400)
          .json({ message: "Estoque insuficiente para essa venda!" });
      }

      // ✅ Gerar IDs únicos
      const idAbastecimento = gerarIdCombustivel();
      const idVenda = gerarIdCombustivel();

      // ✅ Registrar o abastecimento
      await Abastecimento.create({
        idabastecimento: idAbastecimento,
        idcombustivel: idCombustivel,
        quantidade: litros,
        valor: valorTotal,
        bomba,
      });

      // ✅ Registrar a venda
      await Venda.create({
        codigo: idVenda,
        data: dataReg,
        valor: valorTotal,
        cpf: cpfFuncionario,
        formapagamento: formaPagamento,
      });

      // ✅ Atualizar o estoque do combustível
      combustivel.qtddisponivel -= litros;
      await combustivel.save();

      res.json({ message: "✅ Venda registrada com sucesso!" });
    } catch (error) {
      console.error("❌ Erro ao registrar venda:", error);
      res
        .status(500)
        .json({ message: "Erro ao registrar venda.", error: error.message });
    }
  },

  /**
   * Lista os combustíveis disponíveis para abastecimento.
   */
  async listar(req, res) {
    try {
      const combustiveis = await Combustivel.findAll({
        attributes: [
          "idcombustivel",
          "tipocombustivel",
          "valorlitro",
          "qtddisponivel",
        ],
        include: [
          {
            association: "fornecedores",
            attributes: ["nome"],
            through: { attributes: [] }, // Remove colunas extras da tabela intermediária
          },
        ],
      });

      // Formata o retorno para exibir corretamente no frontend
      const combustiveisFormatados = combustiveis.map((combustivel) => ({
        idcombustivel: combustivel.idcombustivel,
        tipocombustivel: combustivel.tipocombustivel,
        valorlitro: parseFloat(combustivel.valorlitro),
        qtddisponivel: combustivel.qtddisponivel,
        fornecedor:
          combustivel.fornecedores.length > 0
            ? combustivel.fornecedores[0].nome
            : "Desconhecido",
      }));

      return res.json(combustiveisFormatados);
    } catch (error) {
      console.error("❌ Erro ao listar combustíveis:", error);
      res.status(500).json({
        message: "Erro ao listar combustíveis.",
        error: error.message,
      });
    }
  },

  /**
   * Atualiza o preço de um combustível no banco de dados.
   */
  async atualizarPreco(req, res) {
    try {
      const { idcombustivel } = req.params; // ID do combustível vindo da URL
      const { valorlitro } = req.body; // Novo preço vindo do frontend

      // Verifica se o ID e o novo valor foram informados
      if (!idcombustivel || !valorlitro) {
        return res
          .status(400)
          .json({
            message: "ID do combustível e novo valor são obrigatórios.",
          });
      }

      // Busca o combustível no banco
      const combustivel = await Combustivel.findByPk(idcombustivel);
      if (!combustivel) {
        return res.status(404).json({ message: "Combustível não encontrado." });
      }

      // Atualiza o preço do combustível
      await combustivel.update({ valorlitro });

      res.json({ message: "✅ Preço do combustível atualizado com sucesso!" });
    } catch (error) {
      console.error("❌ Erro ao atualizar preço do combustível:", error);
      res
        .status(500)
        .json({
          message: "Erro ao atualizar preço do combustível.",
          error: error.message,
        });
    }
  },
};
