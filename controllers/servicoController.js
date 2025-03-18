const pool = require('../models/db');

const servicoController = {
  index: async (req, res) => {
    try {
        const nomeFuncionario = req.query.nome || "Usuário";
        res.render("Servico/servico", { nomeFuncionario});
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao buscar usuários');
    }
  },
};

module.exports = servicoController;