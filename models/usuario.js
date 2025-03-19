import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { config } from "dotenv";

config()
export const Usuario = database.define(
  "usuario",
  {
    usuario: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(14),
      references: {
        model: "funcionario",
        key: "cpf",
      },
    },
  },
  {
    tableName: "usuario",
    schema: "posto",
    timestamps: false,
  }
);



