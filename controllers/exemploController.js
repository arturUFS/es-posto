const { Usuario } = require("../models/usuario");
const { Funcionario } = require("../models/funcionario");
const { Endereco } = require("../models/endereco");

const exemploController = {
  index: async (req, res) => {
    try {
      // Buscar todos os usuários usando Sequelize
      const users = await Usuario.findAll();
      const funcs = await Funcionario.findAll({include: Endereco});
      console.log(users);
      res.render("exemplo", { users });
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao buscar usuários");
    }
  },
};

module.exports = exemploController;