# Zoox Smart Data API
## Projeto de Avaliação do Desenvolvedor

[Documentação da API](https://documenter.getpostman.com/view/4046195/S1a8yjzF?version=latest)

Desenvolver uma API REST usando:
- Node.JS.
- Banco de dados: MongoDB
- Entrada e saída de dados em json
- Código publicado no github

A API deverá expor endpoints para CRUD de cidade e estado:
1. Estado:
   - id
   - nome
   - abreviação (Ex. RJ, SP , etc)
   - data de criação
   - data da última alteração

2. Cidade:
   - id
   - nome
   - estadoId
   - data de criação
   - data da última alteração

Operações mínimas para cada entidade:
- Inserir
- Alterar
- Excluir
- Listar (incluir ordenação e filtro de busca)

Assumir:
- Codificação UTF-8
- Timezone de Brasília
- Língua: Português Brasileiro

Serão avaliados:
- Desenvolvimento seguindo os requisitos acima
- Código funcionando
- Clareza de código e formatação adequada
- Boas práticas (DRY, injeção de dependências, etc)
- Correto tratamento de erros e exceções
- Segurança (filtragem e validação dos dados)

Pontos extras:
- Testes automatizados
- Documentação (openAPI)
- Cache
- Proteção da API por chave de api no header X-Api-Key
