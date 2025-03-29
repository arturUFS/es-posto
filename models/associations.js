import { Usuario } from "../models/usuario.js";
import { Funcionario } from "../models/funcionario.js";
import { Endereco } from "../models/endereco.js";
import { Combustivel } from "./combustivel.js";
import { Abastecimento } from "./abastecimento.js";
import { Fornecedor } from "./fornecedor.js";
import { FornecedorCombustivel } from "./fornecedor_combustivel.js";
import { Produto } from "./produto.js";
import { FornecedorProduto } from "./fornecedor_produto.js";
import { ItemVenda } from "./itemvenda.js";
import { Veiculo } from "./veiculo.js";
import { Venda } from "./venda.js";
import { Agendamento } from "./agendamento.js";

// Funcionario - Endereco
Funcionario.belongsTo(Endereco, {
  foreignKey: "idendereco",
});
Endereco.hasMany(Funcionario, {
  foreignKey: "idendereco",
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

// Combustivel - Abastecimento
Combustivel.hasMany(Abastecimento, {
  foreignKey: "idcombustivel",
  as: "abastecimentos",
});

Abastecimento.belongsTo(Combustivel, {
  foreignKey: "idcombustivel",
  as: "combustivel",
});

// Associação entre Fornecedor e Endereco
Fornecedor.belongsTo(Endereco, {
  foreignKey: "idendereco",
  as: "endereco", // Alias para a associação
});

Endereco.hasMany(Fornecedor, {
  foreignKey: "idendereco",
  as: "fornecedores", // Alias para a associação
});

// Associação entre Fornecedor e Combustivel (tabela intermediária FornecedorCombustivel)
Fornecedor.belongsToMany(Combustivel, {
  through: FornecedorCombustivel,
  foreignKey: "cnpj",
  as: "combustiveis", // Alias para a associação
});

Combustivel.belongsToMany(Fornecedor, {
  through: FornecedorCombustivel,
  foreignKey: "idcombustivel",
  as: "fornecedores", // Alias para a associação
});

// Produto - ItemVenda

Produto.hasMany(ItemVenda, {
  foreignKey: "idproduto",
  as: "itensVenda",
});
ItemVenda.belongsTo(Produto, {
  foreignKey: "idproduto",
  as: "produto",
});

// Fornecedor - Produto

Fornecedor.belongsToMany(Produto, {
  through: FornecedorProduto,
  foreignKey: "cnpj",
  as: "produtos",
});
Produto.belongsToMany(Fornecedor, {
  through: FornecedorProduto,
  foreignKey: "idproduto",
  as: "fornecedores",
});

//Venda - ItemVenda

Venda.belongsTo(ItemVenda, {
  foreignKey: "iditemvenda",
  as: "itemvenda",
});

//Venda - Abastecimento

Venda.belongsTo(Abastecimento, {
  foreignKey: "idabastecimento",
  as: "abastecimento",
});

//Venda - Abastecimento

Venda.belongsTo(Agendamento, {
  foreignKey: "idagendamento",
  as: "agendamento",
});
