import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { Usuario } from "../models/usuario.js";
import { Funcionario } from "../models/funcionario.js";

config()

export const authController = {
  login: async (req, res) => {
    const { usuario, senha } = req.body;

    try {
      // Buscar o usuário no banco de dados
    const result = await Usuario.findOne({
      where: { usuario }
    });
      

      if (result == null) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }

      

      // Verificar se a senha informada é igual à do banco
      if (senha !== result.senha) {
        return res.status(401).json({ message: "Senha incorreta" });
      }

      // Buscar o nome do funcionário usando o CPF encontrado
      const cpf = result.cpf;
      const funcResult = await Funcionario.findOne({
        where: { cpf }
      });
        

      let nomeFuncionario = "Usuário"; // Nome padrão caso não seja encontrado

      if (funcResult != null) {
        nomeFuncionario = funcResult.nome;
      }

      // Gerar token JWT
      const token = jwt.sign(
        { id: result.id, usuario: result.usuario },
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


