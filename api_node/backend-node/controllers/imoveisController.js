// controllers/imoveisController.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DB_PATH;

console.log(dbPath);  // Verifique se o caminho está correto.

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados imoveis.db:', err.message);
  } else {
    console.log('Banco de dados imoveis.db conectado com sucesso!');
  }
}); 

// Funções para API (req, res)

// Listar imóveis com paginação, filtros, ordenação e TOTAL de imóveis
const listarImoveis = (req, res) => {
  let { pagina = 1, limite = 10, cidade, titulo, ordemCampo = 'id', ordemDirecao = 'asc' } = req.query;

    // Validações dos parâmetros de ordenação
    const camposOrdenacaoPermitidos = ['id', 'titulo', 'preco', 'cidade']; // Campos permitidos para ordenação
    const direcoesPermitidas = ['asc', 'desc']; // Direções permitidas para ordenação
  
    // Se o campo de ordenação não for válido, usa 'id' como padrão
    if (!camposOrdenacaoPermitidos.includes(ordemCampo)) {
      ordemCampo = 'id';
    }
  
    // Se a direção da ordenação não for válida, usa 'asc' como padrão
    if (!direcoesPermitidas.includes(ordemDirecao)) {
      ordemDirecao = 'asc';
    }

  pagina = parseInt(pagina);
  limite = parseInt(limite);
  const offset = (pagina - 1) * limite;

  // Base da query
  let baseQuery = 'FROM imoveis';
  const params = [];
  const whereClauses = [];

  // Adiciona filtros
  if (cidade) {
    whereClauses.push('cidade LIKE ?');
    params.push(`%${cidade}%`);
  }

  if (titulo) {
    whereClauses.push('titulo LIKE ?');
    params.push(`%${titulo}%`);
  }

  if (whereClauses.length > 0) {
    baseQuery += ' WHERE ' + whereClauses.join(' AND ');
  }

  // Ordenação
  const orderClause = `ORDER BY ${ordemCampo} ${ordemDirecao.toUpperCase()}`;

  // 1º - Contar o total de imóveis no filtro
  const countQuery = `SELECT COUNT(*) as total ${baseQuery}`;
  console.log('Query para contar total de imóveis:', countQuery); // Adicionado para debugar

  db.get(countQuery, params, (err, countResult) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Erro ao contar imóveis' });
    }

    const total = countResult.total;
    const totalPaginas = Math.ceil(total / limite);

    console.log(`Total de imóveis encontrados: ${total} / ${totalPaginas}`); // Adicionado para verificar o total

    // 2º - Buscar imóveis da página atual com ordenação
    const selectQuery = `SELECT * ${baseQuery} ${orderClause} LIMIT ? OFFSET ?`;
    const selectParams = [...params, limite, offset];


    db.all(selectQuery, selectParams, (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Erro ao buscar imóveis' });
      }

      res.json({
        total,
        paginaAtual: pagina,
        limite,
        imoveis: rows
      });
    });
  });
};


// Criar um novo imóvel (via req.body)
const criarImovel = (req, res) => {
  const { titulo, descricao, preco, endereco, numero, bairro, cidade, uf, cep } = req.body;
  const sql = `
    INSERT INTO imoveis (titulo, descricao, preco, endereco, numero, bairro, cidade, uf, cep)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [titulo, descricao, preco, endereco, numero, bairro, cidade, uf, cep];

  db.run(sql, params, function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Erro ao criar imóvel' });
    }
    res.status(201).json({ id: this.lastID, ...req.body });
  });
};

// Criar imóvel direto (objeto imovel) - para scripts
const criarImovelDireto = (imovel) => {
  return new Promise((resolve, reject) => {
    const { titulo, descricao, preco, endereco, numero, bairro, cidade, uf, cep } = imovel;
    const sql = `
      INSERT INTO imoveis (titulo, descricao, preco, endereco, numero, bairro, cidade, uf, cep)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [titulo, descricao, preco, endereco, numero, bairro, cidade, uf, cep];

    db.run(sql, params, function(err) {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve({ id: this.lastID, ...imovel });
      }
    });
  });
};

// Atualizar imóvel
const atualizarImovel = (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, preco, endereco, numero, bairro, cidade, uf, cep } = req.body;

  if (!titulo || !descricao || !preco || !endereco) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando!' });
  }

  const sql = `
    UPDATE imoveis 
    SET titulo = ?, descricao = ?, preco = ?, endereco = ?, numero = ?, bairro = ?, cidade = ?, uf = ?, cep = ? 
    WHERE id = ?
  `;

  db.run(sql, [titulo, descricao, preco, endereco, numero, bairro, cidade, uf, cep, id], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Erro ao atualizar imóvel' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Imóvel não encontrado' });
    }

    res.json({ message: 'Imóvel atualizado com sucesso' });
  });
};

// Excluir imóvel
const excluirImovel = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM imoveis WHERE id = ?`;

  db.run(sql, [id], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Erro ao excluir imóvel' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Imóvel não encontrado' });
    }

    res.json({ message: 'Imóvel excluído com sucesso' });
  });
};

// Detalhar imóvel por ID
const detalharImovelPorId = (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM imoveis WHERE id = ?`;

  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Erro ao buscar imóvel' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Imóvel não encontrado' });
    }

    res.json(row);
  });
};

// Exportar todas as funções
module.exports = {
  listarImoveis,
  criarImovel,
  criarImovelDireto,
  atualizarImovel,
  excluirImovel,
  detalharImovelPorId
};
