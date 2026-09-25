# RSVP — Aniversário da Ana Karolina

Backend bem simples em Node.js/Express que guarda as confirmações de
presença num arquivo `convidados.json`. Ele também serve a própria
página do convite (pasta `public/`), então é só um único serviço para
publicar.

## Rodar localmente

```bash
npm install
npm start
```

Abra `http://localhost:3000` — o convite e a lista de presença já
funcionam juntos.

## Como funciona

- `GET /api/rsvp` → devolve a lista de quem já respondeu.
- `POST /api/rsvp` com `{ "nome": "...", "vai": true }` → adiciona ou
  atualiza a resposta dessa pessoa.
- Tudo fica salvo em `convidados.json`, na própria pasta do projeto.

## Hospedagem gratuita recomendada: Render

Para um site pessoal como esse, o **Render** (render.com) é a opção
mais simples:

1. Suba esta pasta para um repositório no GitHub.
2. No Render, crie um **Web Service** novo apontando para o repositório.
3. Build command: `npm install` — Start command: `npm start`.
4. Plano **Free** — não pede cartão de crédito.

Você recebe uma URL pública (tipo `https://seu-app.onrender.com`) que
já é o convite completo com a lista de presença.

**Duas limitações do plano gratuito do Render vale saber:**
- O serviço "dorme" depois de 15 minutos sem acesso e demora alguns
  segundos para acordar no primeiro acesso seguinte — sem problema
  para um convite de festa.
- O disco não é garantido entre um deploy e outro (só entre reinícios
  por inatividade). Ou seja: se você fizer um novo deploy depois que
  as pessoas já confirmaram presença, é mais seguro baixar o
  `convidados.json` atualizado antes (Render tem um "Shell" no painel
  para isso) e subir esse mesmo arquivo junto no próximo deploy.

Alternativas caso queira comparar: **Railway** (mais rápido, mas o
crédito grátis de sign-up dura só cerca de um mês) ou **Glitch**
(bem simples de editar direto no navegador, também dorme por
inatividade).