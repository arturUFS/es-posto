import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { config } from "dotenv";

config();

export const Agendamento = database.define(
  "agendamento",
  {
    idagendamento: {
      type: DataTypes.STRING(15),
      primaryKey: true,
    },
    idservico: {
      type: DataTypes.STRING(15),
      allowNull: false,
      references: {
        model: "servico", // Nome da tabela referenciada
        key: "idservico", // Chave primária da tabela referenciada
      },
    },
    idplaca: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: "veiculo", // Nome da tabela referenciada
        key: "idplaca", // Chave primária da tabela referenciada
      },
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "agendamento",
    schema: "posto",
    timestamps: false,
  }
);
