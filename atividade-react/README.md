# Estuda+ — Organizador de estudos

Aplicação React + Vite para organizar atividades e anotações de estudo. O projeto também demonstra consumo de API e navegação entre páginas.

## Funcionalidades

- Criar, concluir, filtrar e remover atividades; progresso salvo em `localStorage`.
- Exibir data e horário consultados em uma API Express.
- Criar, listar, editar e excluir anotações por meio da API.
- Navegação entre Atividades, Anotações e Sobre com React Router.
- Estados de carregamento, erros de rede e formulários controlados.

## Conceitos das aulas 08 e 09

- **JSX:** marcação declarativa dentro dos componentes.
- **Componentes:** cabeçalho, formulário, abas, item de atividade e cartões reutilizáveis.
- **Props:** componentes recebem dados e manipuladores por propriedades.
- **Listas:** atividades, filtros, notas e conceitos são renderizados com `map` e chaves.
- **Renderização condicional:** mensagens vazias, erros, estados de carregamento e estado da API.
- **Estado (`useState`):** atividades, formulários, filtros, notas e estados de rede.
- **Formulários:** criação e edição controladas por estado.
- **Efeito (`useEffect`):** persistência local e carregamento de dados remotos.
- **API:** chamadas HTTP para horário e CRUD de notas.
- **React Router:** rotas `/`, `/notas` e `/sobre` sem recarregar a página.
- **DOM virtual:** React compara a árvore de elementos declarada e atualiza as partes necessárias após mudanças de estado.

## Executar localmente

Requer Node.js e npm. Em um terminal, inicie primeiro a API:

```powershell
cd atividades\aula04-05\api
npm install
npm run dev
```

Em outro terminal, inicie o front-end:

```powershell
cd atividade-react
npm install
npm run dev
```

O front-end usa `http://localhost:3000` como API padrão. Para trocar, crie `atividade-react/.env.local` com `VITE_API_BASE_URL=https://seu-servico.onrender.com`. Gere uma versão de produção com `npm run build`.

## Publicação

Na Vercel, configure a pasta raiz como `atividade-react`, build `npm run build` e saída `dist`. Defina `VITE_API_BASE_URL` com a URL pública do serviço Express. A API tem configuração de serviço no arquivo `atividades/aula04-05/api/render.yaml`; configure a origem do front-end na variável `FRONTEND_ORIGIN` antes da publicação.

## Estrutura relacionada

- `atividades/aula04-05/api`: API de horário e CRUD de notas.
- `atividades/aula04-05/postman`: coleção Postman para os endpoints.
- `atividades/aula04-05/relatorio-entrega.md`: arquitetura, execução e evidências solicitadas nas atividades.
- `atividades/aula06-gestao`: backlog e quadro Kanban do projeto Estuda+.
- `atividades/aula07-css-box-flex` e `atividades/aula07-tailwind`: exercícios de CSS.

O deploy deve ser criado nas contas do estudante na Vercel e no Render; as instruções e arquivos de configuração estão incluídos, mas URLs remotas só devem ser registradas após a publicação real.
