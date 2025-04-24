import sqlite3

def inserir_imovel(titulo, descricao, tipo, valor, cep, endereco):
    # Conecta ao banco de dados
    conn = sqlite3.connect('imoveis.db')
    cursor = conn.cursor()
    
    # Insere um novo imóvel na tabela
    cursor.execute('''
    INSERT INTO imoveis (titulo, descricao, tipo, valor, cep, endereco)
    VALUES (?, ?, ?, ?, ?, ?)
    ''', (titulo, descricao, tipo, valor, cep, endereco))

    # Commit para salvar as alterações
    conn.commit()
    
    # Fecha a conexão
    conn.close()

    print("Imóvel inserido com sucesso!")

# Exemplo de uso
inserir_imovel(
    "Apartamento no Centro", 
    "Apartamento de 2 quartos, próximo à praça principal", 
    "Apartamento", 
    220000, 
    "01001-000", 
    "Rua Central, 123, Centro"
)
