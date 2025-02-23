const pool = require('../models/db');

const homeController = {
  index: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.render('home', { users: result.rows });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao buscar usuários');
    }
  },
};

module.exports = homeController;