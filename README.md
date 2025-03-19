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
- `exemploController.js` - Exemplo de um controller (pode ser usado como modelo para novos controllers).
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
- `exemplo.ejs` - Template de exemplo.
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

# Sobre Issues

As issues são para organizar quem tá fazendo o que. 

### Assignments
"Quero começar uma tarefa"
- Olhe na issue para ver se alguém não está fazendo. Se não, assign yourself e a tarefa é sua. Qualquer coisa pergunte ao responsável e negocie
- Se não colocar quem está fazendo o que, perderemos tempo fazendo coisas duas vezes e ainda pode gerar mais conflitos no código.
- Se for alterar algo em alguma tarefa em si, avise o responsável da tarefa. Negocie antes para não gerar conflitos

### Organização das issues
Estão organizadas em Módulos:
- Módulo de Funcionário
- Módulo de Fornecedor
- Módulo de Produto
- Módulo de Serviço
- MóduLo de Combustível
- Models: todos os models/entidade/ classe/ tabela estão aqui (menos as de funcionário, forneedor, produto, serviço e combustível)
- Funções gerais: Issues que não se encaixam acima

### Novas issues
Achou algum problema que precisa de atenção? Nova issue no módulo correspondente e qualquer coisa avisa no grupo

# Commits

Cada um tem sua branch, vou TENTAR explicar o passo a passo. Vou colocar em comandos porque acho mais fácil que olhar cada coisa no VS Code para colocar aqui, mas isso pode fazer por lá também.
SEMPRE atualize a main localmente antes de começar uma nova tarefa. 
### Quando não tenho nada para adicionar ou antes de começar uma tarefa nova:
- ```git branch```. identifique a branch que você está
- ```git checkout main```. troque para a main
- ```git pull```. atualize sua main local
- ```git checkout nome_branch```. troque para sua branch
- ```git rebase main```. atualize sua branch com a nova main
  
### Adicionando algo que eu fiz na branch na nuvem
- ```git branch```. identifique a branch que você está
- ```git checkout nome_branch```. se não estiver, troque para sua branch
- ```git add .```. staging suas mudanças
- ```git commit -m "descrição do commit entre aspas"```. comitando na sua branch na nuvem
- ```git push```. enviando para a branch na nuvem
  
### Adicionando ao main. Essa parte é muito delicadada. 
Melhor sempre tirar dúvida para saber como faz e ver como está tanto sua branch como o main. Pode gerar conflitos e Pull Requests.
Com o main atualizado localmente e depois de subir sua branch,
- ```git branch```. identifique a branch que você está
- ```git checkout main```. troque para a main
- ```git rebase nome-branch```. atualize a main com sua branch
- ```git push```. subir para main da nuvem
  
### Dicas
Sempre vá fazendo os passos e colocando ```git status```. Isso ajuda a saber o que está acontecendo em cada etapa e também dá dicas dos próximos comandos.
Sempre que fazer um ```git push``` vá no repositório no navegador, atualize e vê se ta tudo certo, se deu conflitos e etc.
Melhor tirar dúvida antes se tiver qualquer dúvida do que lidar com problemões depois.
