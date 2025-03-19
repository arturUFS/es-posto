import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { config } from "dotenv";

config()
export const Funcionario = database.define(
  "funcionario",
  {
    cpf: {
      type: DataTypes.STRING(14),
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    datanascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    idendereco: {
      type: DataTypes.STRING(15),
      references: {
        model: "endereco", // Nome da tabela referenciada
        key: "idendereco", // Chave primária da tabela referenciada
      },
    },
  },
  {
    tableName: "funcionario",
    schema: "posto",
    timestamps: false,
  }
);


