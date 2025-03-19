export const produtoController = {
  index: async (req, res) => {
    try {
      const nomeFuncionario = req.query.nome || "Usuário";
      res.render("Produtos/produtos", {nomeFuncionario});
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao buscar usuários');
    }
  },
};
