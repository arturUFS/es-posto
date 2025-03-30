# Sistema de Gerenciamento do Posto de Gasolina

Projeto desenvolvido durante a disciplina de Engenharia de Software I e Engenharia de Software II do curso de Ciência da Computação da Universidade Federal de Sergipe.

# Integrantes da Equipe

- **Antônio Correia Dantas Neto** ([Perfil no Github](github.com/net1nho))
- **Artur Gabriel Dantas Santos** ([Perfil 1 no Github](github.com/arturUFS)) e ([Perfil 2 no Github](https://github.com/Arturgds))
- **Ellen Caroline Soares dos Santos** ([Perfil no Github](github.com/ellencarols))
- **Lanna Luara Novaes Silva** ([Perfil no Github](github.com/lannalua))
- **Lavínia Louise Rosa Santos** ([Perfil no Github](github.com/lavinialouisee))
- **Luis Eduardo Cardoso de Santana** ([Perfil no Github](github.com/luisedu2106))

# Estrutura do Projeto

Este documento explica a estrutura do projeto **es-posto**, detalhando a finalidade de cada diretório e arquivo principal.

## Diretórios e Arquivos

### `assets/`
Pasta reservada para armazenar recursos estáticos, como imagens, ícones e arquivos CSS/JS adicionais.

### `config/`
Armazena arquivos de configuração, como conexões com banco de dados e configurações globais do projeto.

### `controllers/`
Contém os arquivos responsáveis por gerenciar a lógica das requisições HTTP. Cada controller lida com um recurso específico:
- `authController.js` - Gerencia autenticação de usuários.
- `combustivelController.js` - Controla operações relacionadas a combustíveis.
- `fornecedorController.js` - Gerencia fornecedores.
- `funcionarioController.js` - Controla funcionários.
- `homeController.js` - Lida com a página inicial e rotas principais.
- `produtoController.js` - Controla produtos disponíveis no sistema.
- `servicoController.js` - Gerencia serviços oferecidos.

### `middlewares/`
Contém middlewares para tratamento de requisições antes de chegarem aos controllers.
- `authMiddleware.js` - Middleware de autenticação para restringir acesso a determinadas rotas.

### `models/`
Define os modelos de dados utilizados no banco de dados.

### `node_modules/`
Diretório gerenciado pelo npm que contém as dependências do projeto.

### `routes/`
Armazena as definições de rotas, conectando URLs aos controllers correspondentes.

### `views/`
Contém os arquivos de visualização do projeto (templates EJS):
- Diretórios como `Combustivel/`, `Fornecedor/`, `Funcionario/`, `Produtos/` e `Servico/` armazenam páginas específicas para cada módulo.
- `home.ejs` - Página inicial.
- `login.ejs` - Página de login.

### `.env`
Arquivo de variáveis de ambiente, utilizado para armazenar credenciais e configurações sensíveis.

## Executando o Projeto

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Inicie o servidor:
   ```sh
   npm start


   ```
   Para rodar a aplicação use ```npm start``` ou ```npm run dev``` no terminal.
   Quando aparecer "Servidor rodando na porta 3000", abra um navegador seu e abra o link http://localhost:3000/.

## Observações

1. A rota '/" vai listar os usuarios e senhas afim de teste para avaliação
