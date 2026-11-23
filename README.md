# 🌿 FlorScan

**Explore a natureza, descubra espécies e cultive conhecimento.**

O FlorScan é uma aplicação Angular para explorar espécies de plantas, identificá-las por foto e cuidar melhor delas. Reúne um catálogo pesquisável, identificação real de plantas por imagem (API do [Pl@ntNet](https://plantnet.org/)), sistema de favoritos, autenticação e uma área administrativa com dashboard — tudo com persistência real em uma Web API própria.

Projeto acadêmico de Desenvolvimento Web Front-End (Ciência da Computação, Universidade FUMEC), desenvolvido por **Ana Luiza de Lacerda** e **Gabriel Batista Silva**.

---

## Identidade visual

Verde-oliva, rosa e tons suaves, com a fonte Nunito e bordas arredondadas — uma cara leve e acolhedora, de jardim digital.

| Cor | Hex | Uso |
|---|---|---|
| Verde oliva | `#707318` | Principal / destaques |
| Verde claro | `#ABA415` | Secundária |
| Rosa vibrante | `#FB8BA3` | Interativos |
| Rosa suave | `#FFB1C2` | Decorativa |
| Pêssego | `#FFD4C9` | Fundos |
| Branco lavanda | `#F9F8FE` | Superfícies |

---

## O que o FlorScan faz

- 🔍 **Catálogo** — busca, filtros por categoria e favoritos, páginas de detalhes com cuidados.
- 📷 **Identificação por imagem** — envie uma foto e o Pl@ntNet analisa de verdade (não é simulação): nome científico, nomes populares, família botânica, confiança, e link direto para a planta no catálogo, se ela já existir.
- 🔐 **Contas** — login e cadastro com formulários reativos e validação em tempo real; visitante x administrador.
- 🛠️ **Administração** — CRUD completo de espécies, com dashboard de indicadores.
- 🌐 **Dados reais** — tudo persistido em uma Web API própria (não há mais arrays simulados ou `localStorage` fazendo esse papel).

> Os resultados da identificação são sugestões automáticas do Pl@ntNet — uma confiança alta não é garantia, e cabe revisão humana.

---

## Telas

| Tela | Rota |
|---|---|
| Início (destaques + identificação) | `/` |
| Catálogo | `/catalogo` |
| Detalhes da espécie | `/plantas/:id` |
| Login / Cadastro | `/login`, `/cadastro` |
| Administração *(admin)* | `/administracao` |
| Dashboard *(admin)* | `/dashboard` |

---

## Tecnologias

Angular 20 · TypeScript · Reactive Forms · HttpClient · RxJS · json-server (Web API) · Node.js/Express/Multer (proxy do Pl@ntNet) · SCSS · Karma/Jasmine.

---

## Como rodar

Precisa de Node 22.12+ e npm. Três terminais, nesta ordem:

```bash
npm install
cp .env.example .env     # preencha PLANTNET_API_KEY (grátis em my.plantnet.org/signup)

npm run api               # terminal 1 — Web API do catálogo (porta 3000)
npm run api:identificacao # terminal 2 — proxy do Pl@ntNet (porta 3333)
npm start                  # terminal 3 — Angular, abre em localhost:4200
```

Sem a chave do Pl@ntNet, tudo funciona normalmente — só a identificação por foto fica indisponível (com aviso claro na tela).

**Login de demonstração:** `admin@florscan.com` / `FlorScan123` (acesso a `/administracao` e `/dashboard`).

| Comando | O que faz |
|---|---|
| `npm run api` / `npm run api:identificacao` | Sobe as duas APIs locais |
| `npm start` | Servidor Angular |
| `npm run build` | Build de produção |
| `npm run test:ci` | Roda os 35 testes unitários |

---

## Avisos importantes

- **Autenticação demonstrativa:** usuários ficam na Web API local, mas sem hashing de senha, tokens ou HTTPS — não é um sistema seguro de produção.
- **Privacidade da foto:** enviada só ao Pl@ntNet para identificar a espécie; não é salva em disco nem na Web API.
- **Favoritos** vivem em `sessionStorage` (preferência da sessão do visitante, não um dado da API).

---

## Quer entender a fundo?

Este README é o resumo. O desenvolvimento completo — arquitetura, decisões, bugs encontrados e como foram corrigidos, testes — está documentado em:

- [`docs/relatorio-desenvolvimento-completo.md`](docs/relatorio-desenvolvimento-completo.md) — relatório técnico completo.
- [`docs/relatorio-academico.md`](docs/relatorio-academico.md) — relatório para a entrega acadêmica.

---

**[github.com/delacerdaq/flor-scan](https://github.com/delacerdaq/flor-scan)** · *Tecnologia e natureza conectadas em uma experiência de descoberta.*
