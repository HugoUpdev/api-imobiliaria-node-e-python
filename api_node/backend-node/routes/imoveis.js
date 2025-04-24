const express = require('express');
const router = express.Router();
const imoveisController = require('../controllers/imoveisController');
const autenticarAdmin = require('../middlewares/autenticarAdmin'); 

// Rotas de CRUD
router.get('/', imoveisController.listarImoveis);               // Lista todos os imóveis
router.post('/', imoveisController.criarImovel);                // Cria um novo imóvel
router.put('/:id', imoveisController.atualizarImovel);         // Atualiza um imóvel pelo ID
router.delete('/:id', autenticarAdmin, imoveisController.excluirImovel); // Exige que o admin esteja autenticado
router.get('/:id', imoveisController.detalharImovelPorId);     // Detalha um imóvel pelo ID

module.exports = router;
