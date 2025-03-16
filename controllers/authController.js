const pool = require("../models/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authController = {
  login: async (req, res) => {
    const { usuario, senha } = req.body;

    try {
      // Buscar o usuário no banco de dados
      const result = await pool.query(
        "SELECT * FROM posto.usuario WHERE usuario = $1",
        [usuario]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }

      const user = result.rows[0];

      // Verificar se a senha informada é igual à do banco
      if (senha !== user.senha) {
        return res.status(401).json({ message: "Senha incorreta" });
      }

      // Buscar o nome do funcionário usando o CPF encontrado
      const funcResult = await pool.query(
        "SELECT nome FROM posto.funcionario WHERE cpf = $1",
        [user.cpf]
      );

      let nomeFuncionario = "Usuário"; // Nome padrão caso não seja encontrado

      if (funcResult.rows.length > 0) {
        nomeFuncionario = funcResult.rows[0].nome;
      }

      // Gerar token JWT
      const token = jwt.sign(
        { id: user.id, usuario: user.usuario },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.json({
        message: "Login realizado com sucesso!",
        token,
        nome: nomeFuncionario,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },
};

module.exports = authController;
