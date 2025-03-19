import { Usuario } from "../models/usuario.js";
import { Funcionario } from "../models/funcionario.js";
import { Endereco } from "../models/endereco.js";

// Funcionario - Endereco
Funcionario.belongsTo(Endereco, {
    foreignKey: "idendereco",
    as: "endereco",
});
Endereco.hasMany(Funcionario, {
    foreignKey: "idendereco",
    as: "funcionarios",
});


// Funcionario - Usuario
Funcionario.hasOne(Usuario, {
    foreignKey: "cpf",
    as: "usuario",
});

Usuario.belongsTo(Funcionario, {
    foreignKey: "cpf",
    as: "funcionario",
});
