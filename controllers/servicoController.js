import { Servico } from "../models/servico.js";
import { Agendamento } from "../models/agendamento.js";
import { Venda } from "../models/venda.js";
import { Veiculo } from "../models/veiculo.js";
import { Funcionario } from "../models/funcionario.js";

function gerarIdServico() {
  return Math.random().toString(36).substring(2, 17); // Gera um ID de 15 caracteres
}

function gerarIdAgendamento() {
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

  /*
    Cadastra um novo serviço no banco de dados
  */
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

  // Lista todos os serviços
  async listar(req, res) {
    try {
      // Busca todos os servicos no banco de dados
      const servicos = await Servico.findAll({
        attributes: ["idservico", "tiposervico", "valor"], // Apenas os campos necessários
        attributes: ["idservico", "tiposervico", "valor"], // Apenas os campos necessários
      });

      // Retorna os serviços como JSON
      res.json(servicos);
    } catch (error) {
      console.error("❌ Erro ao listar serviços:", error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },
  /*
    Agenda um novo serviço para um veículo
  */
  async agendar_servico(req, res) {
    try {
      const {
        dataServico,
        hora,
        valor,
        idservico,
        cpfFuncionario,
        status,
        formaPagamento,
        nome,
        telefone,
        dataEntrada,
        tipoveiculo,
        ano,
        placa,
        cor,
        modelo,
      } = req.body;

      // ✅ Validação dos campos obrigatórios
      if (
        !dataServico ||
        !cpfFuncionario ||
        !hora ||
        !valor ||
        !idservico ||
        !formaPagamento ||
        !status ||
        !nome ||
        !telefone ||
        !dataEntrada ||
        !tipoveiculo ||
        !placa ||
        !cor ||
        !modelo ||
        !ano
      ) {
        console.log(dataServico);
        console.log(cpfFuncionario);
        console.log(hora);
        console.log(valor);
        console.log(idservico);
        console.log(formaPagamento);
        console.log(status);
        console.log(nome);
        console.log(telefone);
        console.log(dataEntrada);
        console.log(tipoveiculo);
        console.log(placa);

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
      const servico = await Servico.findByPk(idservico);
      if (!servico) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }

      //Gerar IDs únicos
      const idAgendamento = gerarIdAgendamento();
      const idVenda = gerarIdAgendamento();

      //Registra o veículo
      await Veiculo.create({
        idplaca: placa,
        nomeresponsavel: nome,
        dataentrada: dataEntrada,
        telefone: telefone,
        tipoveiculo: tipoveiculo,
        ano: ano,
        cor: cor,
        modelo: modelo,
      });

      //Registra o agendamento
      await Agendamento.create({
        idagendamento: idAgendamento,
        idservico: idservico,
        idplaca: placa,
        valor: valor,
        data: dataServico,
        hora: hora,
        status: status,
      });

      //Registra a venda
      await Venda.create({
        codigo: idVenda,
        data: dataServico,
        valor: valor,
        cpf: cpfFuncionario,
        formapagamento: formaPagamento,
        idagendamento: idAgendamento,
      });

      res.json({ message: "✅ Agendamento registrado com sucesso!" });
    } catch (error) {
      console.error("❌ Erro ao registrar agendamento:", error);
      res.status(500).json({
        message: "Erro ao registrar agendamento.",
        error: error.message,
      });
    }
  },

  //Lista todos os agendamentos
  async listar_agendamentos(req, res) {
    try {
      // Busca todos os agendamentos no banco de dados
      const agendamentos = await Agendamento.findAll({
        attributes: ["idagendamento", "data", "idservico", "idplaca", "status"], // Apenas os campos necessários
      });

      // Retorna os serviços como JSON (para consumo no front-end)
      res.json(agendamentos);
    } catch (error) {
      console.error("❌ Erro ao listar agendamentos:", error);
      res.status(500).json({ message: "Erro no servidor" });
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

  /**
   * Atualiza os dados de um serviço
   */
  async atualizar(req, res) {
    try {
      const { idservico } = req.params;
      const { tiposervico, valor, duracao, local, descricao } = req.body;

      const servico = await Servico.findByPk(idservico);
      if (!servico) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }

      if (tiposervico) servico.tiposervico = tiposervico;
      if (valor) servico.valor = valor;
      if (duracao) servico.duracao = duracao;
      if (local) servico.local = local;
      if (descricao) servico.descricao = descricao;

      await servico.save();

      res.json({ message: "Serviço atualizado com sucesso", servico });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao atualizar serviço", error: error.message });
    }
  },

  /**
   *   Exclui um serviço pelo id
   */
  async excluir(req, res) {
    try {
      const { idservico } = req.params;

      const servico = await Servico.findByPk(idservico);
      if (!servico) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }

      await servico.destroy();

      res.json({ message: "Serviço excluído com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao excluir serviço", error: error.message });
    }
  },

  /**
   *   Atualizar um agendamento pelo id
   */
  async atualizar_agendamento(req, res) {
    try {
      const { idagendamento } = req.params;
      const { idservico, idplaca, valor, hora, status } = req.body;

      const agendamento = await Agendamento.findByPk(idagendamento);
      if (!agendamento) {
        return res.status(404).json({ message: "Agendamento não encontrado" });
      }

      if (idservico) agendamento.idservico = idservico;
      if (idplaca) agendamento.idplaca = idplaca;
      if (valor) agendamento.valor = valor;
      if (hora) agendamento.hora = hora;
      if (status) agendamento.status = status;

      await agendamento.save();

      res.json({ message: "Agendamento atualizado com sucesso", agendamento });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao atualizar agendamento",
        error: error.message,
      });
    }
  },

  /**
   *   Exclui um agendamento pelo id
   */
  async excluir_agendamento(req, res) {
    try {
      const { idagendamento } = req.params;

      const agendamento = await Agendamento.findByPk(idagendamento);
      const venda = await Venda.findOne({ where: { idagendamento } });
      if (!agendamento) {
        return res.status(404).json({ message: "Agendamento não encontrado" });
      }
      await venda.destroy();
      await agendamento.destroy();

      res.json({ message: "Agendamento excluído com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao excluir agendamento", error: error.message });
    }
  },
};
