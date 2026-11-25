# Relatório — Consumo e criação de APIs

## Projeto

O Estuda+ separa a interface React (`../../atividade-react`) da API Express (`api`). O front-end consulta `/api/horario` e oferece interface de cadastro, consulta, edição e exclusão de anotações usando os endpoints `/api/notas`.

## Executar localmente

1. Inicie a API com `cd atividades/aula04-05/api`, `npm install` e `npm run dev`.
2. Em outro terminal, inicie `atividade-react` com `npm install` e `npm run dev`.
3. Abra `/` para atividades e horário, e `/notas` para o CRUD.
4. Importe `postman/Estuda-mais-API.postman_collection.json` no Postman. Ajuste `baseUrl` conforme o ambiente e execute as requisições de cima para baixo.

## Endpoints e respostas

| Endpoint | Uso | Resposta de sucesso |
|---|---|---|
| `GET /api/horario?timezone=America/Sao_Paulo` | atividade de consumo | 200, JSON com `iso`, `localDateTime` e `timeZone`; fuso opcional |
| `GET /api/notas` | leitura/listagem | 200, array JSON |
| `GET /api/notas/:id` | leitura individual | 200 ou 404 |
| `POST /api/notas` | criação | 201 com a nota |
| `PUT /api/notas/:id` | atualização | 200 com a nota atualizada |
| `DELETE /api/notas/:id` | exclusão | 204 sem conteúdo |

## Publicação

O arquivo `api/render.yaml` configura o serviço Render. Para a Vercel, configure `atividade-react` como diretório raiz, `npm run build` como comando de build, `dist` como saída e `VITE_API_BASE_URL` como URL do serviço Render. No Render, configure `FRONTEND_ORIGIN` para permitir chamadas do domínio Vercel.

**URLs públicas:** preencher depois de criar os serviços nas contas do estudante. Não há URL de API Render confirmada neste relatório. A URL Vercel anteriormente usada para a versão anterior do app é `https://atividade-react-rfvm2cmoh-swell4.vercel.app`; confirme uma nova publicação após conectar a API.

## Evidências a capturar após publicação

1. Arquivos de código da API e da tela React de anotações.
2. Aplicação local mostrando o horário retornado e o CRUD de notas.
3. Serviço ativo e logs de deploy no painel Render.
4. Projeto e implantação ativa no painel Vercel.
5. Repositórios GitHub da API e do front-end (ou organização escolhida para o curso).
6. Coleção Postman importada e respostas/status de GET, POST, PUT e DELETE.

Essas capturas comprovam contas e deploys reais; por isso devem ser feitas após conectar e publicar os serviços.
