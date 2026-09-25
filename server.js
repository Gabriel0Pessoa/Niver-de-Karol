const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DB_FILE = path.join(__dirname, 'convidados.json');

function lerConvidados() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

function salvarConvidados(lista) {
  fs.writeFileSync(DB_FILE, JSON.stringify(lista, null, 2));
}

// Lista todos os convidados que já responderam
app.get('/api/rsvp', (req, res) => {
  res.json(lerConvidados());
});

// Recebe uma confirmação (ou recusa) de presença
app.post('/api/rsvp', (req, res) => {
  const { nome, vai } = req.body || {};
  if (!nome || typeof nome !== 'string' || typeof vai !== 'boolean') {
    return res.status(400).json({ erro: 'Envie "nome" (texto) e "vai" (true ou false).' });
  }

  let lista = lerConvidados();
  // Se a pessoa já respondeu antes, atualiza a resposta dela em vez de duplicar
  lista = lista.filter(p => p.nome.trim().toLowerCase() !== nome.trim().toLowerCase());
  lista.push({ nome: nome.trim(), vai, data: new Date().toISOString() });
  salvarConvidados(lista);

  res.json(lista);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});