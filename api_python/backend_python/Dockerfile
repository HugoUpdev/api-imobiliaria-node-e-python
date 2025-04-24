# Usar imagem oficial do Python
FROM python:3.9

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o arquivo de dependências para o container
COPY requirements.txt .

# Instalar as dependências
RUN pip install -r requirements.txt

# Copiar o restante dos arquivos do backend Python
COPY . .

# Expor a porta 8000 para o FastAPI
EXPOSE 8000

# Rodar o servidor com o Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
