import { Fornecedor } from "../models/fornecedor.js";
import { Endereco } from "../models/endereco.js";

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

export const fornecedorController = {
  index: async (req, res) => {
    try {
      const nomeFuncionario = req.query.nome || "Usuário"; // Obtém o nome do usuário logado

      // Busca todos os fornecedores no banco de dados
      const fornecedores = await Fornecedor.findAll({
        attributes: ["cnpj", "nome", "email", "telefone"], // Campos necessários
      });

      // Renderiza a página fornecedor.ejs e passa os dados
      res.render("Fornecedor/fornecedor", { nomeFuncionario, fornecedores });
    } catch (err) {
      console.error("Erro ao buscar fornecedores:", err);
      res.status(500).send("Erro no servidor");
    }
  },

  // Lista todos os fornecedores
  async listar(req, res) {
    try {
      // Busca todos os fornecedores no banco de dados
      const fornecedores = await Fornecedor.findAll({
        attributes: ["cnpj", "nome", "email", "telefone"], // Apenas os campos necessários
      });

      // Renderiza a página fornecedor.ejs e passa os fornecedores
      res.render("Fornecedor/fornecedor", {
        fornecedores: fornecedoresFormatados,
      });
    } catch (error) {
      console.error("Erro ao listar fornecedores:", error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },

  async consultar(req, res) {
    try {
      const { cnpj } = req.params;

      // Buscar fornecedor pelo CNPJ
      const fornecedor = await Fornecedor.findOne({ where: { cnpj } });

      if (!fornecedor) {
        return res.status(404).json({ message: "Fornecedor não encontrado" });
      }

      // Buscar endereço vinculado ao fornecedor
      const endereco = await Endereco.findOne({
        where: { idendereco: fornecedor.idendereco },
      });

      res.json({
        cnpj: fornecedor.cnpj,
        nome: fornecedor.nome,
        iniciovigencia: fornecedor.iniciovigencia,
        telefone: fornecedor.telefone,
        email: fornecedor.email,
        area: fornecedor.area,
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
      console.error("Erro ao consultar fornecedor:", error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },

  // Atualiza os dados de um fornecedor pelo CNPJ.
  async atualizar(req, res) {
    try {
      const { cnpj } = req.params; // Obtém o CNPJ da URL
      const { nome, iniciovigencia, telefone, email, area, endereco } =
        req.body; // Novos dados

      // Verifica se o fornecedor existe
      const fornecedor = await Fornecedor.findOne({ where: { cnpj } });
      if (!fornecedor) {
        return res.status(404).json({ message: "Fornecedor não encontrado" });
      }

      // Atualiza os dados do fornecedor
      await fornecedor.update({
        nome,
        iniciovigencia: iniciovigencia,
        telefone,
        email,
        area,
      });

      // Atualiza os dados do endereço, se existirem
      const enderecoDB = await Endereco.findOne({
        where: { idendereco: fornecedor.idendereco },
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

      res.json({ message: "Fornecedor atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },

  // Exclui um fornecedor pelo CNPJ e remove seu endereço vinculado.
  async excluir(req, res) {
    try {
      const { cnpj } = req.params; // Obtém o CNPJ da URL

      // Busca o fornecedor no banco de dados
      const fornecedor = await Fornecedor.findOne({ where: { cnpj } });

      // Se não encontrar o fornecedor, retorna erro 404
      if (!fornecedor) {
        return res.status(404).json({ message: "Fornecedor não encontrado" });
      }

      // Guarda o ID do endereço vinculado antes de excluir o fornecedor
      const idEndereco = fornecedor.idendereco;

      // Exclui o fornecedor
      await fornecedor.destroy();

      // Exclui o endereço vinculado ao fornecedor
      await Endereco.destroy({ where: { idendereco: idEndereco } });

      res.json({ message: "Fornecedor excluído com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },
};
