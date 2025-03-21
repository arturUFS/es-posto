import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { config } from "dotenv";

config();

export const Venda = database.define(
  "venda",
  {
    idvenda: {
      type: DataTypes.STRING(15),
      primaryKey: true,
    },
    datavenda: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    valortotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    idfuncionario: {
      type: DataTypes.STRING(14),
      references: {
        model: "funcionario", // Nome da tabela referenciada
        key: "cpf", // Chave primária da tabela referenciada
      },
    },
    idcliente: {
      type: DataTypes.STRING(15),
      references: {
        model: "cliente", // Nome da tabela referenciada
        key: "idcliente", // Chave primária da tabela referenciada
      },
    },
  },
  {
    tableName: "venda",
    schema: "posto",
    timestamps: false,
  }
);
