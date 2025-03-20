import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { config } from "dotenv";

config();

export const Abastecimento = database.define(
  "abastecimento",
  {
    idabastecimento: {
      type: DataTypes.STRING(15),
      primaryKey: true,
    },
    idcombustivel: {
      type: DataTypes.STRING(15),
      allowNull: false,
      references: {
        model: "combustivel", // Nome da tabela referenciada
        key: "idcombustivel", // Chave primária da tabela referenciada
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
    bomba: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "abastecimento",
    schema: "posto",
    timestamps: false,
  }
);