const express = require('express');
const cors = require('cors'); // Importe o CORS

const app = express();
const port = 3000;

const imoveisRoutes = require('./routes/imoveis');
const logger = require('./middlewares/logger');
app.use(cors()); // Habilite CORS para todas as rotas

app.use(express.json()); // Permite ler JSON no corpo da requisição
app.use(logger); // Aplica o middleware logger a todas as requisições
app.use('/imoveis', imoveisRoutes); // Rota de imóveis

app.listen(port, () => {
  console.log('Servidor rodando na porta 3000');
});

app.use((err, req, res, next) => {
  console.error('Erro capturado:', err.stack);
  res.status(500).json({ message: 'Erro interno no servidor' });
});