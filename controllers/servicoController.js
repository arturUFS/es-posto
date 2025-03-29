import { Servico } from "../models/servico.js";
import { Agendamento} from "../models/agendamento.js";
import { Venda } from "../models/venda.js";
import { Veiculo} from "../models/veiculo.js";
import { Funcionario } from "../models/funcionario.js";
import { FuncionarioAgendamento } from "../models/funcionario_agendamento.js";


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
        attributes: ["idservico","tiposervico"], // Apenas os campos necessários
      });

      // Retorna os serviços como JSON
      res.json(servicos);
    } catch (error) {
      console.error("❌ Erro ao listar serviços:", error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },

  async agendar_servico(req,res){
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
        !dataServico||
        !cpfFuncionario ||
        !hora ||
        !valor ||
        !idservico ||
        !formaPagamento ||
        !status ||
        !nome ||
        !telefone||
        !dataEntrada||
        !tipoveiculo||
        !placa ||
        !cor ||
        !modelo||
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
      })

      //Registra o agendamento
      await Agendamento.create({
        idagendamento: idAgendamento,
        idservico: idservico,
        idplaca: placa,
        valor: valor,
        data: dataServico,
        hora: hora,
        status: status,
      })

      //Registra a venda
      const novaVenda = await Venda.create({
        codigo: idVenda,
        data: dataServico,
        valor: valor,
        cpf: cpfFuncionario,
        formapagamento: formaPagamento,
        idagendamento: idAgendamento,
      });

      console.log(novaVenda);

      res.json({ message: "✅ Agendamento registrado com sucesso!" });
    } catch (error){
      console.error("❌ Erro ao registrar agendamento:", error);
      res
        .status(500)
        .json({ message: "Erro ao registrar agendamento.", error: error.message });
    }

  },
//Lista todos os agendamentos
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

  async consultar(req, res) {
    try {
      const { idagendamento } = req.params;

      const agendamento = await Agendamento.findOne({
        where: { idagendamento },
        include: [
          {
            model: Servico,
            as: "servico",
            attributes: ["tiposervico", "valor", "duracao"],
          },
          {
            model: Veiculo,
            as: "veiculo",
            attributes: ["nomeResponsavel", "telefone", "modelo", "cor"],
          },
        ],
      });
  
  
      if (!agendamento) {
        return res.status(404).json({ message: "Agendamento não encontrado" });
      }
  
  
      // Buscar funcionários associados ao agendamento
      const funcionarios = await FuncionarioAgendamento.findAll({
        where: { idservico: agendamento.idservico },
        include: [
          {
            model: Funcionario,
            attributes: ["nome", "cpf", "telefone"],
          },
        ],
      });
  
  
      res.json({
        agendamento,
        funcionarios: funcionarios.map(f => f.funcionario),
      });
    } catch (error) {
      console.error("Erro ao consultar agendamento:", error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },
  
  
  // Gera relatório de serviços realizados
  async gerarRelatorioServicos(req, res) {
    try {
      const { dataInicio, dataFim } = req.query;
  
      if (!dataInicio || !dataFim) {
        return res.status(400).json({
          message: "Datas de início e fim são obrigatórias"
        });
      }
  
  
      // Busca agendamentos concluídos no período
      const agendamentos = await Agendamento.findAll({
        where: {
          status: "Concluído",
          data: {
            [Op.between]: [dataInicio, dataFim],
          },
        },
        include: [
          {
            model: Servico,
            attributes: ["tiposervico", "valor"],
          },
          {
            model: Veiculo,
            attributes: ["modelo", "cor"],
          },
        ],
        order: [["data", "ASC"]],
      });
  
  
      // Calcula totais
      const totalServicos = agendamentos.length;
      const totalValor = agendamentos.reduce((sum, ag) => sum + parseFloat(ag.servico.valor), 0);
  
  
      // Formata os dados para o relatório
      const relatorio = {
        periodo: `${dataInicio} até ${dataFim}`,
        totalServicos,
        totalValor: totalValor.toFixed(2),
        servicosRealizados: agendamentos.map(ag => ({
          data: ag.data,
          tipoServico: ag.servico.tiposervico,
          valor: ag.servico.valor,
          veiculo: `${ag.veiculo.modelo} (${ag.veiculo.cor})`,
        })),
      };
  
  
      res.json(relatorio);
    } catch (error) {
      console.error("Erro ao gerar relatório de serviços:", error);
      res.status(500).json({ message: "Erro ao gerar relatório" });
    }
  },
  
  
  // Atualiza um serviço
  async atualizarServico(req, res) {
    try {
      const { idservico } = req.params;
      const { tiposervico, valor, duracao, local, descricao } = req.body;
  
  
      const servico = await Servico.findByPk(idservico);
      if (!servico) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
  
  
      await servico.update({
        tiposervico,
        valor,
        duracao,
        local,
        descricao,
      });
  
  
      res.json({ message: "Serviço atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar serviço:", error);
      res.status(500).json({ message: "Erro ao atualizar serviço" });
    }
  },
  
  
  // Exclui um serviço
  async excluirServico(req, res) {
    try {
      const { idservico } = req.params;
  
  
      // Verifica se existem agendamentos para este serviço
      const agendamentos = await Agendamento.count({
        where: { idservico },
      });
  
  
      if (agendamentos > 0) {
        return res.status(400).json({
          message: "Não é possível excluir o serviço pois existem agendamentos vinculados"
        });
      }
  
      await Servico.destroy({ where: { idservico } });

      res.json({ message: "Serviço excluído com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir serviço:", error);
      res.status(500).json({ message: "Erro ao excluir serviço" });
    }
  }
};
