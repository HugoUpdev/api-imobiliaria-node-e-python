
# API Imobiliária 🏘️

Este projeto tem como objetivo desenvolver uma solução completa (para estudo) de gerenciamento de imóveis, incluindo cadastro, consulta, atualização e exclusão (CRUD), com integração a APIs externas como busca de endereço por CEP.

---

## 🔧 Tecnologias e Ferramentas

- **Backend**
  - **Python 3.12+** com **FastAPI** (para `api_python`)
  - **Node.js** com **Express** (para `api_node`)
  - **SQLite** como banco de dados para armazenamento dos imóveis
  
- **Frontend**
  - **Vue.js 3** (para `api_node/frontend-vue`)
  - **HTML + Bootstrap** (para `api_python/frontend_html`)

- **Outros**
  - Docker
  - Git + GitHub
  - GitHub Projects
  - Markdown para documentação

---

## 📁 Estrutura do Projeto

```
api_imobiliaria/
├── api_python/                        # Backend em Python com FastAPI
│   ├── backend_python/                
│   │   ├── main.py                    # Arquivo principal da API Python
│   └── frontend_html/                 
│   │   └── index.html                 # Arquivos HTML do frontend Python
│   └── docker-compose.yml             # Arquivo de configuração do Docker
├── api_node/                          # Backend em Node.js com Express
│   ├── backend-node/                 
│   │   ├── index.js                   # Arquivo principal da API Node.js
│   └── frontend-vue/                 
│       ├── public/                    # Arquivos públicos do frontend Vue
│       └── src/                       # Código fonte do Vue.js
├── shared/                            # Diretório compartilhado
│   └── database/                      # Banco de dados SQLite
│       └─ imoveis.db                  # Banco de dados dos imóveis
└── README.md                          # Este arquivo
```

---

## 📌 API Python - `api_python`

A **API Python** é construída com **FastAPI** e usa **SQLite** para armazenar os dados dos imóveis. Este backend é responsável por fornecer a API para cadastro, consulta, edição e exclusão de imóveis. Além disso, a aplicação conta com um frontend básico em HTML + Bootstrap.

### Funcionalidades da API Python:
- CRUD completo para imóveis
- Integração com API externa para busca de endereço por CEP
- Frontend básico em HTML + Bootstrap

### Tecnologias utilizadas:
- **FastAPI** para criar a API
- **SQLite** como banco de dados - comum entre api_python e api_node
- **Jinja2** para renderização de templates HTML

### Link da API Python:
- [Acessar API Python](http://144.22.192.52:8000/)

---

## 📌 API Node - `api_node`

A **API Node** é construída com **Express** e serve como backend para o frontend em **Vue.js**. Essa API oferece os mesmos endpoints de CRUD, mas a comunicação com o frontend é feita de forma mais dinâmica, usando Vue.js para a interface.

### Funcionalidades da API Node:
- CRUD completo para imóveis
- Frontend em Vue.js com funcionalidades interativas como filtros, paginação, etc.

### Tecnologias utilizadas:
- **Express** para criar a API
- **Vue.js 3** para o frontend
- **SQLite** como banco de dados - comum entre api_python e api_node

### Link da API Node:
- [Acessar API Node](http://144.22.192.52:8082/)

---

## 📌 Funcionalidades planejadas

- [x] Estrutura inicial do projeto
- [x] Cadastro de imóveis
- [x] Consulta por filtros (CEP, bairro, tipo)
- [x] Autenticação de usuários
- [x] Dashboard administrativo

---

## 👨‍💻 Autor

Desenvolvido por **Hugo Cleon de Melo Coutinho Júnior**  
📧 hugo.dev@exemplo.com  
🔗 [GitHub](https://github.com/HugoUpdev)

---

> Projeto criado para fins de estudo, aprimoramento técnico e portfólio.  
