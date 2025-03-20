import { DataTypes } from "sequelize";
import { database } from "../config/database";
import { config } from "dotenv";

config();
export const FornecedorProduto = database.define(
  "fornecedor_produto",
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
    idProduto: {
      type: DataTypes.STRING(15),
      primaryKey: true,
      references: {
        model: "produto", // Nome da tabela referenciada
        key: "idProduto", // Chave primária da tabela referenciada
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "fornecedor_produto",
    schema: "posto",
    timestamps: false,
  }
);