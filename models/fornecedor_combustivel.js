import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { config } from "dotenv";

config();
export const FornecedorCombustivel = database.define(
  "fornecedor_combustivel",
  {
    cnpj: {
      type: DataTypes.STRING(18),
      primaryKey: true,
      references: {
        model: "fornecedor", // Nome da tabela referenciada
        key: "cnpj", // Chave primária da tabela referenciada
      },
      onDelete: "CASCADE",
    },
    idcombustivel: {
      type: DataTypes.STRING(15),
      primaryKey: true,
      references: {
        model: "combustivel", // Nome da tabela referenciada
        key: "idcombustivel", // Chave primária da tabela referenciada
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "fornecedor_combustivel",
    schema: "posto",
    timestamps: false,
  }
);