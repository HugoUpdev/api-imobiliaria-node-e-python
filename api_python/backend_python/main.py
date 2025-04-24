import sqlite3
import requests
import os

from fastapi import FastAPI, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List
from starlette.requests import Request
from fastapi import Form
from fastapi.responses import RedirectResponse
from fastapi.responses import HTMLResponse

app = FastAPI(title="API Imobiliária", version="1.0")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend_html")

app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")

TEMPLATE_DIR = os.path.join(BASE_DIR, "frontend_html")
templates = Jinja2Templates(directory=TEMPLATE_DIR)
import os

DB_PATH = os.getenv("DB_PATH") or "/app/database/imoveis.db"

# 📦 Modelos
class ImovelBase(BaseModel):
    titulo: str
    descricao: str
    tipo: str
    preco: float
    cep: str
    endereco: str = None
    numero: str = None  # ✅ Adicionado


class ImovelCreate(ImovelBase):
    pass

class Imovel(ImovelBase):
    id: int

# 🔌 Função para conectar ao banco
def conectar_banco():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# 🚀 Inicializa banco e cria tabela se necessário
def inicializar_banco():
    conn = conectar_banco()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS imoveis (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT NOT NULL,
            preco REAL NOT NULL,
            endereco TEXT NOT NULL,
            numero TEXT,
            bairro TEXT,
            cidade TEXT,
            uf TEXT,
            cep TEXT
        )
    ''')
    conn.commit()
    conn.close()

inicializar_banco()

# 📌 Função para consultar ViaCEP
def buscar_endereco_via_cep(cep: str):
    try:
        response = requests.get(f"https://viacep.com.br/ws/{cep}/json/")
        response.raise_for_status()  # Levanta um erro se a requisição falhar
        dados_cep = response.json()

        if "erro" in dados_cep:
            raise HTTPException(status_code=400, detail="CEP não encontrado")
        
        # Retorna apenas os campos de endereço que você precisa
        return {
            "endereco": f"{dados_cep.get('logradouro')}, {dados_cep.get('bairro')}, {dados_cep.get('localidade')} - {dados_cep.get('uf')}"
        }
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erro ao consultar o ViaCEP: {str(e)}")

# 📌 Endpoints
@app.get("/")
async def home_page(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})

# GET: Renderizar a página de login
@app.get("/admin")
async def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

# POST: Processar login
@app.post("/login")
async def processar_login(request: Request, usuario: str = Form(...), senha: str = Form(...)):
    # ⚠️ Aqui é só um exemplo simples com usuário fixo
    if usuario == "admin" and senha == "123":
        return RedirectResponse(url="/listaAdmin", status_code=303)  # redireciona
    return templates.TemplateResponse("login.html", {"request": request, "erro": "Credenciais inválidas"})

# Rota para renderizar a página de listagem de imóveis
@app.get("/listaAdmin")
async def listar_imoveis_html(request: Request, admin: bool = False):
    try:
        conn = conectar_banco()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM imoveis")
        rows = cursor.fetchall()
        conn.close()

        imoveis = []
        for row in rows:
            imovel = dict(row)
            preco = imovel['preco']
            imovel['preco'] = f"R$ {preco:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
            imoveis.append(imovel)
        return templates.TemplateResponse("listaAdmin.html", {"request": request, "imoveis": imoveis})

    except Exception as e:
        return HTMLResponse(content=f"<h1>Erro ao listar imóveis:</h1><p>{e}</p>", status_code=500)

# Rota para renderizar a página de listagem de imóveis
@app.get("/lista")
async def listar_imoveis_capa(request: Request, admin: bool = False):
    try:
        conn = conectar_banco()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM imoveis")
        rows = cursor.fetchall()
        conn.close()

        imoveis = []
        for row in rows:
            imovel = dict(row)
            preco = imovel['preco']
            imovel['preco'] = f"R$ {preco:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
            imoveis.append(imovel)
        return templates.TemplateResponse("lista.html", {"request": request, "imoveis": imoveis})

    except Exception as e:
        return HTMLResponse(content=f"<h1>Erro ao listar imóveis:</h1><p>{e}</p>", status_code=500)


# GET: Buscar por ID
@app.get("/detalhe/{id}", response_class=HTMLResponse)
async def detalhe_imovel(id: int, request: Request):
    conn = conectar_banco()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM imoveis WHERE id = ?", (id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return HTMLResponse(content="<h1>Imóvel não encontrado</h1>", status_code=404)

    imovel = dict(row)
    preco = imovel['preco']
    imovel['preco'] = f"R$ {preco:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")

    return templates.TemplateResponse("detalhe.html", {"request": request, "imovel": imovel})

# GET: formulário para cadastrar novo imóvel
@app.get("/novo", response_class=HTMLResponse)
async def novo_imovel_form(request: Request):
    return templates.TemplateResponse("formulario.html", {"request": request})

# GET: formulário para editar imóvel	
@app.get("/editar/{id}", response_class=HTMLResponse)
async def editar_imovel(id: int, request: Request):
    conn = conectar_banco()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM imoveis WHERE id = ?", (id,))
    imovel = cursor.fetchone()
    conn.close()
    return templates.TemplateResponse("formulario.html", {"request": request, "imovel": imovel})

# GET: buscar o endereco pelo cep
@app.get("/buscar-endereco/{cep}")
async def buscar_endereco_api(cep: str):
    try:
        response = requests.get(f"https://viacep.com.br/ws/{cep}/json/")
        response.raise_for_status()
        dados = response.json()

        if "erro" in dados:
            return {"erro": True}

        return {
            "endereco": dados.get("logradouro", ""),
            "bairro": dados.get("bairro", ""),
            "cidade": dados.get("localidade", ""),
            "uf": dados.get("uf", "")
        }

    except Exception as e:
        return {"erro": True, "mensagem": str(e)}

# POST: Cadastrar e atualizar imóvel
@app.post("/salvar")
async def salvar_imovel(
    request: Request,
    id: int = Form(None),
    titulo: str = Form(...),
    descricao: str = Form(...),
    preco: float = Form(...),
    endereco: str = Form(...),
    numero: str = Form(""), 
    bairro: str = Form(""),
    cidade: str = Form(""),
    uf: str = Form(""),
    cep: str = Form(""),
):
    conn = conectar_banco()
    cursor = conn.cursor()

    if id:  # Edição
        cursor.execute("""
            UPDATE imoveis
            SET titulo=?, descricao=?, preco=?, endereco=?, numero=?, bairro=?, cidade=?, uf=?, cep=?
            WHERE id=?
        """, (titulo, descricao, preco, endereco, numero, bairro, cidade, uf, cep, id))
    else:  # Inclusão
        cursor.execute("""
            INSERT INTO imoveis (titulo, descricao, preco, endereco, numero, bairro, cidade, uf, cep)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (titulo, descricao, preco, endereco, numero, bairro, cidade, uf, cep))

    conn.commit()
    conn.close()
    return RedirectResponse("/listaAdmin", status_code=303)

# DELETE: Excluir imóvel
@app.post("/excluir/{id}")
async def excluir_via_post(id: int):
    return excluir_imovel(id)

def excluir_imovel(id: int):
    try:
        conn = conectar_banco()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM imoveis WHERE id = ?", (id,))
        conn.commit()
        conn.close()
        return RedirectResponse(url="/listaAdmin", status_code=303)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao excluir imóvel: {str(e)}")
