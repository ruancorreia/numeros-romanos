// Autenticação básica para o painel admin
module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Verificar token (em produção, usar JWT ou outra solução segura)
  if (token === process.env.ADMIN_TOKEN) {
    next();
  } else {
    res.status(401).json({ message: "Acesso não autorizado" });
  }
};
