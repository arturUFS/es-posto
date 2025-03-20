import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { config } from "dotenv";

config();

export const Combustivel = database.define(
  "combustivel",
  {
    idcombustivel: {
      type: DataTypes.STRING(15),
      primaryKey: true,
    },
    tipocombustivel: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    valorlitro: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    qtddisponivel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "combustivel",
    schema: "posto",
    timestamps: false,
  }
);