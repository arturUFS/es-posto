import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { config } from "dotenv";

config();

export const Veiculo = database.define(
  "veiculo",
  {
    idplaca: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    nomeresponsavel: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dataentrada: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    tipoveiculo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cor: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "veiculo",
    schema: "posto",
    timestamps: false,
  }
);