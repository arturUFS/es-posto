import { Servico } from "../models/servico.js";
import { Agendamento} from "../models/agendamento.js";
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

  async listar_agendamentos(req, res) {
      try {
        // Busca todos os serviços no banco de dados
        const agendamentos = await Agendamento.findAll({
          attributes: ["data", "idservico", "idplaca", "status"], // Apenas os campos necessários
        });
  
        // Retorna os serviços como JSON (para consumo no front-end)
        res.json(agendamentos);
      } catch (error) {
        console.error("❌ Erro ao listar agendamentos:", error);
        res.status(500).json({ message: "Erro no servidor" });
      }
    },
};
