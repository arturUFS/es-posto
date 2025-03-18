import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { config } from "dotenv";

config()
export const Endereco = database.define(
  "endereco",
  {
    idEndereco: {
      type: DataTypes.STRING(15),
      primaryKey: true,
    },
    cep: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    bairro: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    logradouro: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    complemento: {
      type: DataTypes.STRING(200),
    },
  },
  {
    tableName: "endereco",
    schema: "posto",
    timestamps: false,
  }
);

// Definir a relação com Funcionario
Endereco.associate = (models) => {
  Endereco.hasMany(models.Funcionario, {
    foreignKey: "idendereco",
    as: "funcionarios",
  });
};
