import { Usuario } from "../models/usuario.js";
import { Funcionario } from "../models/funcionario.js";
import { Endereco } from "../models/endereco.js";

export const exemploController = {
  index: async (req, res) => {
    try {
      // Buscar todos os usuários usando Sequelize
      const users = await Usuario.findAll();
      const funcs = await Funcionario.findAll({include: {model: Endereco}});
      console.log(JSON.stringify(funcs, null, 2));
      res.render("exemplo", { users });
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao buscar usuários");
    }
  },
};
