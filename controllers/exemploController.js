const pool = require('../models/db');

const exemploController = {
  index: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM posto.usuario');
      res.render('exemplo', { users: result.rows });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao buscar usuários');
    }
  },
};

module.exports = exemploController;