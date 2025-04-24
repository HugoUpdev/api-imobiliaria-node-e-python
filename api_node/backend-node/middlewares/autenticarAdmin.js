const autenticarAdmin = (req, res, next) => {
  const adminLogado = req.headers['x-admin-token']; // Exemplo de token no header
  
  if (!adminLogado || adminLogado !== 'seuTokenSecreto') {
    return res.status(403).json({ error: 'Acesso negado. Administrador não autenticado.' });
  }
  
  next(); // Se o token for válido, permite a execução da rota
};

module.exports = autenticarAdmin;
