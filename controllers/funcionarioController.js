import { Funcionario } from "../models/funcionario.js";
import { Endereco } from "../models/endereco.js";
import { Usuario } from "../models/usuario.js";

function gerarIdEndereco() {
  return Math.random().toString(36).substring(2, 17); // Gera um ID de 15 caracteres
}

/**
 * Cadastra um novo endereço no banco de dados e retorna o ID do endereço criado.
 */
async function cadastrarEndereco(endereco) {
  try {
    const idEndereco = gerarIdEndereco(); // Gerando um ID único para o endereço

    const novoEndereco = await Endereco.create({
      idendereco: idEndereco,
      cep: endereco.cep,
      estado: endereco.estado,
      cidade: endereco.cidade,
      bairro: endereco.bairro,
      logradouro: endereco.logradouro,
      complemento: endereco.complemento || null, // Permite complemento opcional
    });

    return novoEndereco.idendereco;
  } catch (error) {
    throw new Error("Erro ao cadastrar endereço: " + error.message);
  }
}

/**
 * Cadastra um novo usuário no banco de dados vinculado a um CPF.
 */
async function criarUsuario(username, senha, cpf) {
  try {
    // Verifica se já existe um usuário com o mesmo nome
    const usuarioExistente = await Usuario.findOne({
      where: { usuario: username },
    });

    if (usuarioExistente) {
      throw new Error("Nome de usuário já está em uso.");
    }

    // Cria o usuário no banco de dados
    await Usuario.create({
      usuario: username,
      senha: senha,
      cpf: cpf, // Associa o usuário ao funcionário
    });
  } catch (error) {
    throw new Error("Erro ao criar usuário: " + error.message);
  }
}

export const funcionarioController = {
  index: async (req, res) => {
    try {
      const nomeFuncionario = req.query.nome || "Usuário";
      res.render("Funcionario/funcionario", {
        nomeFuncionario,
      });
    } catch (err) {
      console.error("Erro ao carregar página de funcionários:", err);
      res.status(500).send("Erro no servidor");
    }
  },

  /**
   * Cadastra um novo funcionário, incluindo o endereço e o usuário.
   */
  async cadastrar(req, res) {
    try {
      const { cpf, nome, email, telefone, datanascimento, endereco, usuario } =
        req.body;

      // Cadastrar o endereço e obter o ID gerado
      const idEndereco = await cadastrarEndereco(endereco);

      // Criar o funcionário vinculado ao endereço cadastrado
      const novoFuncionario = await Funcionario.create({
        cpf,
        nome,
        email,
        telefone,
        datanascimento,
        idendereco: idEndereco,
      });

      // Criar o usuário vinculado ao CPF do funcionário
      await criarUsuario(usuario.username, usuario.senha, cpf);

      res.json({
        message: "Funcionário cadastrado com sucesso!",
        funcionario: novoFuncionario,
      });
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error);
      res.status(500).json({
        message: "Erro ao cadastrar funcionário",
        error: error.message,
      });
    }
  },

  /*
    Lista todos os funcionários
  */
  async listar(req, res) {
    try {
      // Busca todos os funcionários no banco de dados
      const funcionarios = await Funcionario.findAll({
        attributes: ["cpf", "nome", "email", "telefone"], // Apenas os campos necessários
      });

      // Renderiza a página funcionário.ejs e passa os funcionários
      res.render("Funcionario/funcionario", {
        funcionarios: funcionariosFormatados,
      });
    } catch (error) {
      console.error("Erro ao listar funcionários:", error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },

  /*
    Consulta o funcionário pelo seu cpf
  */
  async consultar(req, res) {
    try {
      const { cpf } = req.params;

      // Buscar funcionário pelo CPF
      const funcionario = await Funcionario.findOne({ where: { cpf } });

      if (!funcionario) {
        return res.status(404).json({ message: "Funcionário não encontrado" });
      }

      // Buscar endereço vinculado ao funcionário
      const endereco = await Endereco.findOne({
        where: { idendereco: funcionario.idendereco },
      });

      res.json({
        cpf: funcionario.cpf,
        nome: funcionario.nome,
        dataNascimento: funcionario.datanascimento,
        telefone: funcionario.telefone,
        email: funcionario.email,
        endereco: {
          cep: endereco?.cep || "",
          estado: endereco?.estado || "",
          cidade: endereco?.cidade || "",
          bairro: endereco?.bairro || "",
          logradouro: endereco?.logradouro || "",
          complemento: endereco?.complemento || "",
        },
      });
    } catch (error) {
      console.error("Erro ao consultar funcionário:", error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },

  // Atualiza os dados de um funcionário pelo CPF.
  async atualizar(req, res) {
    try {
      const { cpf } = req.params; // Obtém o CPF da URL
      const { nome, dataNascimento, telefone, email, endereco } = req.body; // Novos dados

      // Verifica se o funcionário existe
      const funcionario = await Funcionario.findOne({ where: { cpf } });
      if (!funcionario) {
        return res.status(404).json({ message: "Funcionário não encontrado" });
      }

      // Atualiza os dados do funcionário
      await funcionario.update({
        nome,
        datanascimento: dataNascimento,
        telefone,
        email,
      });

      // Atualiza os dados do endereço, se existirem
      const enderecoDB = await Endereco.findOne({
        where: { idendereco: funcionario.idendereco },
      });
      if (enderecoDB) {
        await enderecoDB.update({
          cep: endereco.cep,
          estado: endereco.estado,
          cidade: endereco.cidade,
          bairro: endereco.bairro,
          logradouro: endereco.logradouro,
          complemento: endereco.complemento,
        });
      }

      res.json({ message: "Funcionário atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },

  // Exclui um funcionário pelo CPF e remove seu endereço vinculado.
  async excluir(req, res) {
    try {
      const { cpf } = req.params; // Obtém o CPF da URL

      // Busca o funcionário no banco de dados
      const funcionario = await Funcionario.findOne({ where: { cpf } });

      // Se não encontrar o funcionário, retorna erro 404
      if (!funcionario) {
        return res.status(404).json({ message: "Funcionário não encontrado" });
      }

      // Guarda o ID do endereço vinculado antes de excluir o funcionário
      const idEndereco = funcionario.idendereco;

      // Exclui o funcionário
      await funcionario.destroy();

      // Exclui o endereço vinculado ao funcionário
      await Endereco.destroy({ where: { idendereco: idEndereco } });

      res.json({ message: "Funcionário excluído com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },

  // listagem para modal de listar
  listarFuncionarios: async (req, res) => {
    try {
      const funcionarios = await Funcionario.findAll({
        attributes: ["cpf", "nome", "email", "telefone"], // Apenas os campos necessários
      });

      res.json(funcionarios); // Retorna os dados em JSON
    } catch (err) {
      console.error("Erro ao buscar funcionários:", err);
      res.status(500).json({ message: "Erro ao buscar funcionários" });
    }
  },
};
