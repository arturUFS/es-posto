import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { config } from "dotenv";

config();
export const Produto = database.define(
  "produto",
  {
    idproduto: {
      type: DataTypes.STRING(15),
      primaryKey: true,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true, // Permite valores nulos, já que a descrição pode ser opcional
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "produto",
    schema: "posto",
    timestamps: false,
  }
);
