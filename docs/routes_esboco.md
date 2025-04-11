# Esboço de Rotas da API de Imóveis

## Recurso principal: Imóveis

### 📥 Criar um imóvel
**POST /imoveis**

Cadastra um novo imóvel com os dados do formulário (título, tipo, valor, endereço, etc).

---

### 📃 Listar imóveis
**GET /imoveis**

Retorna a lista de imóveis cadastrados. Pode incluir filtros:

- `tipo` (ex: casa, apartamento)
- `cidade`
- `min` (preço mínimo)
- `max` (preço máximo)

**Exemplo:**  
`GET /imoveis?tipo=casa&cidade=CampoGrande&min=100000&max=300000`

---

### 🔍 Ver detalhes de um imóvel
**GET /imoveis/{id}**

Retorna os dados completos de um imóvel específico.

---

### ✏️ Atualizar um imóvel
**PUT /imoveis/{id}**

Atualiza todos os dados do imóvel com o ID informado.

---

### ❌ Deletar um imóvel
**DELETE /imoveis/{id}**

Remove o imóvel do sistema.

---

**Observação**: as rotas seguem o padrão RESTful e retornam JSON com as informações ou mensagens de erro/sucesso.
