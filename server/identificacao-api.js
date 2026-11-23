// Proxy mínimo entre o Angular e a API do Pl@ntNet.
// Existe só para esconder a chave de API (o Pl@ntNet exige a chave na query string,
// o que a exporia se o Angular chamasse a API diretamente do navegador).
// Não grava a imagem em disco: ela fica só em memória durante a requisição.
'use strict';

const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const multer = require('multer');

carregarEnvLocal();

const PORTA = process.env.IDENTIFICACAO_API_PORT || 3333;
const CHAVE_PLANTNET = process.env.PLANTNET_API_KEY;
const ORIGEM_PERMITIDA = process.env.ANGULAR_ORIGIN || 'http://localhost:4200';
const URL_PLANTNET = 'https://my-api.plantnet.org/v2/identify/all';
const ORGAOS_VALIDOS = new Set(['auto', 'leaf', 'flower', 'fruit', 'bark']);
const TAMANHO_MAXIMO_BYTES = 10 * 1024 * 1024;
const TIPOS_ACEITOS = new Set(['image/jpeg', 'image/png']);

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: TAMANHO_MAXIMO_BYTES } });
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', ORIGEM_PERMITIDA);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.sendStatus(204); return; }
  next();
});

app.post('/identificar', upload.single('imagem'), async (req, res) => {
  if (!CHAVE_PLANTNET) {
    res.status(500).json({
      erro: 'chave_nao_configurada',
      mensagem: 'A chave da API do Pl@ntNet (PLANTNET_API_KEY) não está configurada no servidor. Veja o README para obter e configurar a chave.'
    });
    return;
  }

  const arquivo = req.file;
  if (!arquivo) {
    res.status(400).json({ erro: 'imagem_ausente', mensagem: 'Envie uma imagem no campo "imagem".' });
    return;
  }
  if (!TIPOS_ACEITOS.has(arquivo.mimetype)) {
    res.status(400).json({ erro: 'formato_invalido', mensagem: 'A API do Pl@ntNet aceita apenas imagens JPEG ou PNG.' });
    return;
  }

  const organoRecebido = typeof req.body.organo === 'string' ? req.body.organo : 'auto';
  const organo = ORGAOS_VALIDOS.has(organoRecebido) ? organoRecebido : 'auto';

  try {
    const formulario = new FormData();
    formulario.append('images', new Blob([arquivo.buffer], { type: arquivo.mimetype }), arquivo.originalname || 'foto.jpg');
    formulario.append('organs', organo);

    const url = `${URL_PLANTNET}?api-key=${encodeURIComponent(CHAVE_PLANTNET)}`;
    const respostaPlantNet = await fetch(url, { method: 'POST', body: formulario });
    const corpo = await respostaPlantNet.json().catch(() => null);

    if (respostaPlantNet.status === 404) {
      res.status(404).json({ erro: 'especie_nao_identificada', mensagem: 'Não foi possível identificar uma espécie nessa imagem.' });
      return;
    }
    if (respostaPlantNet.status === 429) {
      res.status(429).json({
        erro: 'limite_excedido',
        mensagem: 'O limite diário de identificações da API do Pl@ntNet foi atingido. Tente novamente mais tarde.'
      });
      return;
    }
    if (!respostaPlantNet.ok) {
      console.error('Pl@ntNet retornou erro:', respostaPlantNet.status, JSON.stringify(corpo));
      res.status(502).json({ erro: 'falha_plantnet', mensagem: 'O serviço de identificação Pl@ntNet retornou um erro inesperado.' });
      return;
    }

    res.status(200).json(corpo);
  } catch (erro) {
    console.error('Erro ao consultar a API do Pl@ntNet:', erro.message);
    res.status(502).json({
      erro: 'falha_comunicacao',
      mensagem: 'Não foi possível se comunicar com o serviço de identificação. Verifique sua conexão e tente novamente.'
    });
  }
});

app.listen(PORTA, () => {
  console.log(`API de identificação de plantas ouvindo em http://localhost:${PORTA}`);
  if (!CHAVE_PLANTNET) {
    console.warn('Aviso: PLANTNET_API_KEY não configurada. Veja .env.example e o README.');
  }
});

function carregarEnvLocal() {
  const caminho = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(caminho)) return;
  const linhas = fs.readFileSync(caminho, 'utf-8').split('\n');
  for (const linha of linhas) {
    const correspondencia = linha.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!correspondencia) continue;
    const chave = correspondencia[1];
    let valor = (correspondencia[2] || '').trim();
    if ((valor.startsWith('"') && valor.endsWith('"')) || (valor.startsWith("'") && valor.endsWith("'"))) {
      valor = valor.slice(1, -1);
    }
    if (!(chave in process.env)) process.env[chave] = valor;
  }
}
