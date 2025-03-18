const pool = require('../models/db');

const combustivelController = {
  index: async (req, res) => {
    try {
        const nomeFuncionario = req.query.nome || "Usuário";
        res.render("Combustivel/combustivel", { nomeFuncionario})
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao buscar usuários');
    }
  },
};

module.exports = combustivelController;