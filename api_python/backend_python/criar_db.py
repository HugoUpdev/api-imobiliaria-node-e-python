import sqlite3

# Conecta ao banco de dados (se não existir, o SQLite criará um novo arquivo)
conn = sqlite3.connect('imoveis.db')

# Cria um cursor para executar comandos SQL
cursor = conn.cursor()

# Cria a tabela 'imoveis' se ela não existir
cursor.execute('''
CREATE TABLE IF NOT EXISTS imoveis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    tipo TEXT NOT NULL,
    valor REAL NOT NULL,
    cep TEXT NOT NULL,
    endereco TEXT NOT NULL
)
''')

# Commit para salvar as mudanças
conn.commit()

# Fecha a conexão com o banco
conn.close()

print("Banco de dados e tabela 'imoveis' criados com sucesso!")
