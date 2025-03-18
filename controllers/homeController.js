const pool = require('../models/db');

const homeController = {
  index: async (req, res) => {
    try {
        const nomeFuncionario = req.query.nome || "Usuário"; // Se não tiver nome, usa 'Usuário'
        res.render("home", { nomeFuncionario });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao carregar menu principal');
    }
  },
};

module.exports = homeController;