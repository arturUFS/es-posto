import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { config } from "dotenv";

config();

export const ItemVenda = database.define(
  "itemvenda",
  {
    iditemvenda: {
      type: DataTypes.STRING(15),
      primaryKey: true,
    },
    idproduto: {
      type: DataTypes.STRING(15),
      references: {
        model: "produto", // Nome da tabela referenciada
        key: "idproduto", // Chave primária da tabela referenciada
      },
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "itemvenda",
    schema: "posto",
    timestamps: false,
  }
);
