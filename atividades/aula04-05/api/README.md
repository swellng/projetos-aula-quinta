# API Estuda+

API Express usada nas atividades de consumo e criação de APIs. Guarda notas em `data.json` para fins didáticos. Em produção, armazenamento em arquivo local não é persistente em todas as configurações de hospedagem; use um banco gerenciado caso o serviço precise manter dados após reinicializações.

## Executar

```sh
npm install
npm run dev
```

Por padrão a API fica em `http://localhost:3000`. A variável `PORT` é configurada pela hospedagem. `FRONTEND_ORIGIN` aceita uma ou mais origens separadas por vírgula; deixe ausente apenas para desenvolvimento local.

## Rotas

| Método | Rota | Resultado |
|---|---|---|
| GET | `/api/health` | estado do serviço |
| GET | `/api/horario?timezone=America/Sao_Paulo` | instante ISO e horário formatado no fuso IANA informado (São Paulo por padrão) |
| GET | `/api/notas` | lista anotações |
| GET | `/api/notas/:id` | uma anotação ou 404 |
| POST | `/api/notas` | cria anotação; recebe `{ "titulo": "...", "texto": "..." }` |
| PUT | `/api/notas/:id` | atualiza título e texto |
| DELETE | `/api/notas/:id` | remove anotação; responde 204 |

Campos de título e texto são obrigatórios e limitados a 120 e 5000 caracteres. IDs desconhecidos respondem 404; conteúdo inválido responde 400.

## Render

O blueprint `render.yaml` define a raiz, comandos e verificação de saúde. Após conectar o repositório no Render, informe `FRONTEND_ORIGIN` com a URL de produção do front-end, sem barra final. O endereço público só pode ser documentado depois da criação real do serviço na conta.
