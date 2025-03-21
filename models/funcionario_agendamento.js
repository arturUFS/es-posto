import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { config } from "dotenv";

config();

export const FuncionarioAgendamento = database.define(
  "funcionario_agendamento",
  {
    cpf: {
      type: DataTypes.STRING(14),
      primaryKey: true,
      references: {
        model: "funcionario", // Nome da tabela referenciada
        key: "cpf", // Chave primária da tabela referenciada
      },
      onDelete: "CASCADE",
    },
    idagendamento: {
      type: DataTypes.STRING(15),
      primaryKey: true,
      references: {
        model: "agendamento", // Nome da tabela referenciada
        key: "idagendamento", // Chave primária da tabela referenciada
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "funcionario_agendamento",
    schema: "posto",
    timestamps: false,
  }
);
