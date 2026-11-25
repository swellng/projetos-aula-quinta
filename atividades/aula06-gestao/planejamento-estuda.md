# Planejamento do projeto integrador — Estuda+

## Objetivo e escopo

Construir uma aplicação de estudos com tarefas, progresso e anotações, usando React no front-end e uma API Express. O resultado deste plano é o incremento educacional preparado no repositório; o grupo deve revisar prioridades e estimativas conforme os requisitos reais do Projeto Integrador Interdisciplinar.

## Backlog priorizado

| ID | História / tarefa | Prioridade | Estimativa |
|---|---|---:|---:|
| E1 | Como estudante, quero listar tarefas para organizar o que preciso fazer | Alta | 3 pontos |
| E2 | Como estudante, quero adicionar, concluir e remover tarefas | Alta | 5 pontos |
| E3 | Como estudante, quero filtrar tarefas por situação e ver meu progresso | Alta | 3 pontos |
| E4 | Como estudante, quero guardar tarefas no navegador para não perdê-las | Média | 2 pontos |
| E5 | Como estudante, quero registrar e consultar anotações | Alta | 5 pontos |
| E6 | Como estudante, quero editar e excluir anotações | Alta | 3 pontos |
| E7 | Como estudante, quero consultar data e hora da API | Média | 2 pontos |
| E8 | Como usuário, quero navegar por páginas sem recarregar o app | Média | 3 pontos |
| E9 | Como equipe, queremos instruções de execução e publicação | Média | 2 pontos |

Estimativas são pontos relativos para planejamento de uma equipe pequena, não horas garantidas.

## Sprint 1

**Duração:** uma semana letiva. **Objetivo:** entregar a primeira versão utilizável de tarefas e notas, com API local.

| Dia | Plano |
|---|---|
| 1 | Revisar histórias, criar tarefas, preparar estrutura e branches |
| 2 | Implementar lista, formulário, filtros e progresso |
| 3 | Criar endpoints CRUD e validar dados |
| 4 | Conectar telas React à API e tratar erros/carregamento |
| 5 | Revisar interface responsiva, README, build e demo |

## Quadro Kanban

| A fazer | Em andamento | Revisão | Concluído |
|---|---|---|---|
| Validar necessidades específicas do projeto interdisciplinar | — | — | E1, E2, E3, E4, E5, E6, E7, E8, E9 (implementados neste incremento) |

Atualize o quadro durante a sprint. Limite sugerido para “Em andamento”: 2 itens por integrante.

## Branches e colaboração

- `main`: incrementos revisados e prontos para demonstrar.
- `feat/tarefas-react`, `feat/api-notas`, `feat/rotas-documentacao`: branches curtas por história.
- Abra pull request com resumo, evidências e checklist; ao menos outra pessoa revisa antes de integrar.
- Use commits pequenos com mensagens como `feat: adiciona CRUD de notas` e `docs: registra planejamento da sprint`.

## Definition of Done

- Critérios da história atendidos e comportamento revisado no navegador.
- Interface utilizável em telas estreitas e mensagens de erro/vazio compreensíveis.
- Dados de entrada validados; nenhuma chave secreta incluída no Git.
- README e exemplos de configuração atualizados.
- Build de produção gerado sem erros e diff revisado por colega.
- Alteração integrada à branch principal e demonstrável.

## Riscos e próximos passos

O armazenamento JSON local atende ao exercício, mas não é banco persistente adequado para uma aplicação de produção. Próximos passos sugeridos: escolher banco conforme requisitos do projeto, alinhar backlog aos objetivos interdisciplinares e obter evidências do deploy real.
