import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { config } from "dotenv";

config();
export const Fornecedor = database.define(
  "fornecedor",
  {
    cnpj: {
      type: DataTypes.STRING(18),
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    area: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    inicioVigencia: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    idendereco: {
      type: DataTypes.STRING(15),
      references: {
        model: "endereco", // Nome da tabela referenciada
        key: "idEndereco", // Chave primária da tabela referenciada
      },
    },
  },
  {
    tableName: "fornecedor",
    schema: "posto",
    timestamps: false,
  }
);
