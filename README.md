# API REST com Node.js e MySQL (Arquitetura MVC)

**Aluna:** Laura Claudino Baliana  
**Disciplina:** Programação Web III (PW3)  
**Turma:** 3°NDN  
**Repositório:** `laura-claudino-baliana-API-node-mvc`

Atividade Prática 02: refatoração da API de usuários para o padrão MVC, feita com Express e MySQL, sem ORM. As consultas usam o driver `mysql2` com placeholders (`?`), para não concatenar dados do cliente no SQL.

## Arquitetura (MVC)

Como a aplicação é uma API REST, a camada **View** é a própria resposta em JSON enviada pelo Express. O código é dividido em camadas, cada uma com uma responsabilidade:

```
src/
├── config/        db.js                 Pool de conexão com o MySQL e carregamento do .env (dotenv)
├── models/        usuarioModel.js       Model: todas as consultas SQL parametrizadas
├── controllers/   usuarioController.js  Controller: valida a entrada, chama o Model e responde com o status HTTP
├── routes/        usuarioRoutes.js      Rotas: liga cada verbo HTTP ao método do Controller
└── server.js                            Middlewares (cors, JSON) e subida do servidor
```

Fluxo de uma requisição: `server.js` → `routes` → `controllers` → `models` → MySQL, e a resposta volta pelo mesmo caminho em JSON. Nenhuma query SQL fica no `server.js` nem nas rotas.

## Rotas

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/usuarios` | Insere um usuário com `nome` e `email` no corpo da requisição. |
| GET | `/usuarios` | Lista todos os usuários. |
| PUT | `/usuarios/:id` | Atualiza `nome` e `email` do usuário informado na URL. |
| DELETE | `/usuarios/:id` | Remove o usuário informado na URL. |

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- MySQL 8 (ou MariaDB) em execução na máquina

## Instalação

1. Clone o repositório e entre na pasta do projeto.

2. Instale as dependências:

```bash
npm install
```

3. Crie o banco e a tabela. No cliente MySQL (Workbench, linha de comando ou outro):

```bash
mysql -u root -p < schema.sql
```

O script cria o banco `api_usuarios`, a tabela `usuarios` (chave primária `id` com autoincremento) e três registros de exemplo.

4. Copie o modelo de variáveis de ambiente e preencha com os dados do seu MySQL:

```bash
copy .env.example .env
```

No Linux ou macOS:

```bash
cp .env.example .env
```

Exemplo de `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=api_usuarios
```

O arquivo `.env` fica fora do Git. Não envie senha real para o repositório.

## Como executar

```bash
npm start
```

Para reiniciar sozinho ao salvar arquivos:

```bash
npm run dev
```

O servidor sobe em `http://localhost:3000`.

## Exemplos de requisição

Inserir:

```bash
curl -X POST http://localhost:3000/usuarios -H "Content-Type: application/json" -d "{\"nome\":\"Maria Oliveira\",\"email\":\"maria@email.com\"}"
```

Listar:

```bash
curl http://localhost:3000/usuarios
```

Atualizar o usuário de id 1:

```bash
curl -X PUT http://localhost:3000/usuarios/1 -H "Content-Type: application/json" -d "{\"nome\":\"Ana Souza\",\"email\":\"ana.nova@email.com\"}"
```

Excluir o usuário de id 1:

```bash
curl -X DELETE http://localhost:3000/usuarios/1
```

## Códigos HTTP

- `201` — usuário criado
- `200` — listagem, atualização ou exclusão concluída
- `400` — corpo ou id inválido
- `404` — nenhum registro com o id informado
- `500` — falha ao acessar o banco ou erro interno
