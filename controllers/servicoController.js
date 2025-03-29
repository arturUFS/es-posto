import { Servico } from "../models/servico.js";

function gerarIdServico() {
  return Math.random().toString(36).substring(2, 17); // Gera um ID de 15 caracteres
}

export const servicoController = {
  async index(req, res) {
    try {
      const nomeFuncionario = req.query.nome || "Usuário";
      res.render("Servico/servico", { nomeFuncionario });
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao buscar usuários");
    }
  },

  async cadastrar(req, res) {
    try {
      const { tiposervico, valor, duracao, local, descricao } = req.body;
      const idServico = gerarIdServico();

      const novoServico = await Servico.create({
        idservico: idServico,
        tiposervico,
        valor,
        duracao,
        local,
        descricao,
      });

      res.json({
        message: "Serviço cadastrado com sucesso!",
        servico: novoServico,
      });
    } catch (error) {
      console.error("Erro ao cadastrar serviço:", error);
      res.status(500).json({
        message: "Erro ao cadastrar serviço",
        error: error.message,
      });
    }
  },
  /**
   * Consulta um serviço pelo ID
   */
  async consultar(req, res) {
    try {
      const { idservico } = req.params;

      // Buscar o serviço pelo ID
      const servico = await Servico.findOne({
        where: { idservico },
      });

      if (!servico) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }

      // Retorna os dados do serviço
      res.json({
        idservico: servico.idservico,
        tiposervico: servico.tiposervico,
        descricao: servico.descricao,
        valor: servico.valor,
        duracao: servico.duracao,
        local: servico.local,
      });
    } catch (error) {
      console.error("Erro ao consultar serviço:", error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },
  // Rota para listar todos os serviços
  async listar(req, res) {
    try {
      // Busca todos os serviços no banco de dados com os campos necessários
      const servicos = await Servico.findAll({
        attributes: [
          "idservico",
          "tiposervico",
          "valor",
          "duracao",
          "local",
          "descricao",
        ], // Apenas os campos necessários
      });

      // Retorna os serviços como JSON (para consumo no front-end)
      res.json(servicos);
    } catch (error) {
      console.error("❌ Erro ao listar serviços:", error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },
};
