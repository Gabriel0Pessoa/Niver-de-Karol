const express = require('express');
const cors = require('cors');
const { Redis } = require('@upstash/redis');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Credenciais vêm das variáveis de ambiente configuradas no Render
// (não fica nada sensível escrito no código).
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const CHAVE = 'convidados';

// Lista todos os convidados que já responderam
app.get('/api/rsvp', async (req, res) => {
  const lista = (await redis.get(CHAVE)) || [];
  res.json(lista);
});

// Recebe uma confirmação (ou recusa) de presença
app.post('/api/rsvp', async (req, res) => {
  const { nome, vai } = req.body || {};
  if (!nome || typeof nome !== 'string' || typeof vai !== 'boolean') {
    return res.status(400).json({ erro: 'Envie "nome" (texto) e "vai" (true ou false).' });
  }

  let lista = (await redis.get(CHAVE)) || [];
  lista = lista.filter(p => p.nome.trim().toLowerCase() !== nome.trim().toLowerCase());
  lista.push({ nome: nome.trim(), vai, data: new Date().toISOString() });
  await redis.set(CHAVE, lista);

  res.json(lista);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});