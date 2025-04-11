# Conceitos Básicos de API RESTful

## O que é REST?
REST (Representational State Transfer) é um estilo de arquitetura que define regras para criação de serviços Web. Os principais pontos são:
- Comunicação via HTTP
- Operações sobre recursos (URLs significativas)
- Sem estado (stateless)
- Formato padrão de resposta: JSON

## Métodos HTTP

| Método | Ação                          | Exemplo                          |
|--------|-------------------------------|----------------------------------|
| GET    | Buscar recurso(s)             | /imoveis                         |
| POST   | Criar novo recurso            | /imoveis                         |
| PUT    | Atualizar recurso inteiro     | /imoveis/15                      |
| DELETE | Excluir recurso               | /imoveis/15                      |
| PATCH  | Atualização parcial (opcional)| /imoveis/15                      |

## Status Codes HTTP

| Código | Significado                   |
|--------|-------------------------------|
| 200    | OK                            |
| 201    | Created                       |
| 400    | Bad Request                   |
| 404    | Not Found                     |
| 500    | Internal Server Error         |

## Boas práticas

- Usar substantivos nas URLs (`/imoveis`, não `/getImoveis`)
- Utilizar corretamente os métodos HTTP
- Retornar status code adequado
- Ser consistente na estrutura das respostas
