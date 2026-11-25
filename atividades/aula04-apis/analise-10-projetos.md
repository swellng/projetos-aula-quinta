# Aula 04 — Análise de dez projetos que consomem APIs

Levantamento feito a partir dos README e descrições públicas de cada repositório. O “framework” abaixo é o que o próprio projeto declara; bibliotecas secundárias entram como ferramentas. A API foi identificada pela documentação pública do projeto. Esta análise técnica não é uma auditoria de segurança nem garante que endpoints e serviços externos continuem ativos.

| # | Projeto / repositório | Framework / tecnologias declaradas | API(s) consumidas e finalidade |
|---:|---|---|---|
| 1 | [React-Weather-App — ihranova](https://github.com/ihranova/React-Weather-App) | React, React Hooks, Styled Components | OpenWeather para meteorologia; Unsplash para imagens; geolocalização do navegador para localizar a pessoa usuária. |
| 2 | [W-Weather — Abdelghafour122](https://github.com/Abdelghafour122/react-weather-app) | React, Material UI, SCSS, i18next | OpenWeatherMap para previsões, GeoDB Cities para busca de cidades e IP-API para localização. |
| 3 | [react-weather-app — CrankyHippo](https://github.com/CrankyHippo/react-weather-app) | React, Material UI (dependência indicada no README), componentes e serviços | OpenWeatherMap para clima atual, vento, umidade e horários solares. O README orienta uso de chave em variável de ambiente. |
| 4 | [React-Weather-app — codebucks27](https://github.com/codebucks27/React-Weather-app) | React | OpenWeather API para obter dados meteorológicos e preencher a interface de previsão. |
| 5 | [CineFind — mariamshakerhelal](https://github.com/mariamshakerhelal/CineFind) | React, TypeScript, React Router | TMDB para pesquisar filmes, filtrar categorias, paginar resultados e buscar detalhes. |
| 6 | [movie-browser — TomasJose05](https://github.com/TomasJose05/movie-browser) | React, Vite, React Router, Axios | TMDB para catálogo, pesquisa e detalhes; serviço encapsulado no front-end e chave configurada em ambiente. |
| 7 | [My Pokemon — jorgenlt](https://github.com/jorgenlt/mine-pokemon) | React, Vite, Redux Toolkit, Redux Thunk | PokéAPI para navegar e pesquisar Pokémon; dados favoritos/editados permanecem no armazenamento local. |
| 8 | [PokemonReact — Dereemii](https://github.com/Dereemii/PokemonReact) | React 19, Vite, componentes funcionais | PokéAPI para buscar e mostrar nomes, imagens e informações Pokémon. |
| 9 | [Fuzzy React Spotify — FuzzySid](https://github.com/FuzzySid/React-Spotify) | React, Context API, React-Bootstrap | Spotify Authentication API para login e Spotify Web API para playlists, músicas e trechos de áudio. |
| 10 | [Pokemon App — JuanSeZ](https://github.com/JuanSeZ/pokemon-app-example) | React, TypeScript, Vite, Tailwind CSS, TanStack Query, Axios | PokéAPI para dados de Pokémon; README cita paginação, detalhes e cadeia evolutiva. |

## Comparação e observações

- Os projetos de clima e catálogo adotam chamadas HTTP a APIs externas de dados. Em geral, precisam mostrar carregamento, erros e respeitar limites de requisição.
- React aparece em todos os exemplos levantados; seus componentes e hooks permitem separar a interface e controlar dados assíncronos.
- Chaves usadas diretamente no navegador podem ser vistas por quem acessa o site. Para serviços que exigem segredo, é preferível intermediar chamadas por backend e guardar credenciais no servidor.
- APIs abertas como PokéAPI reduzem a configuração inicial; Spotify e serviços meteorológicos exigem credencial ou configuração de conta em alguns fluxos.
- Para reproduzir a atividade em sala, clone cada repositório, instale as dependências com a ferramenta documentada no README e procure chamadas HTTP (`fetch`, Axios ou serviço equivalente), componentes que exibem os resultados, tratamento de erros e variáveis de ambiente. Não execute os exemplos sem revisar credenciais e dependências.

## Fontes

Os links da tabela apontam aos repositórios e READMEs de origem, que descrevem stack e uso das APIs. Repositórios podem mudar depois deste levantamento.
