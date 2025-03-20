import { DataTypes } from "sequelize";
import { database } from "../config/database";
import { config } from "dotenv";

config();
export const Servico = database.define(
  "servico",
  {
    idservico: {
      type: DataTypes.STRING(15),
      primaryKey: true,
    },
    tiposervico: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    duracao: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    local: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "servico",
    schema: "posto",
    timestamps: false,
  }
);