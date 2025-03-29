import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { config } from "dotenv";

config();

export const Venda = database.define(
  "venda",
  {
    codigo: {
      type: DataTypes.STRING(15),
      primaryKey: true,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(14),
      references: {
        model: "funcionario", // Nome da tabela referenciada
        key: "cpf", // Chave primária da tabela referenciada
      },
    },
    formapagamento: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    idagendamento: {
      type: DataTypes.STRING(14),
      references: {
        model: "agendamento", // Nome da tabela referenciada
        key: "idagendamento", // Chave primária da tabela referenciada
      },
    },
    idabastecimento: {
      type: DataTypes.STRING(14),
      references: {
        model: "abastecimento", // Nome da tabela referenciada
        key: "idabastecimento", // Chave primária da tabela referenciada
      },
    },
    iditemvenda: {
      type: DataTypes.STRING(14),
      references: {
        model: "itemvenda", // Nome da tabela referenciada
        key: "iditemvenda", // Chave primária da tabela referenciada
      },
    },
  },
  {
    tableName: "venda",
    schema: "posto",
    timestamps: false,
  }
);
