# FlorScan

**Explore a natureza, descubra espécies e cultive conhecimento.**

O **FlorScan** é uma aplicação web desenvolvida com Angular que permite explorar espécies de plantas, conhecer suas características, consultar orientações de cuidados e organizar espécies favoritas em uma experiência intuitiva e responsiva.

O projeto foi desenvolvido para fins acadêmicos, com foco na aplicação de conceitos de desenvolvimento front-end, componentização, roteamento, manipulação de dados e organização de uma aplicação Angular.

---

## Sobre o projeto

O FlorScan nasceu da proposta de aproximar as pessoas do universo das plantas por meio da tecnologia.

A plataforma reúne um catálogo interativo de espécies, informações sobre cultivo e manutenção, um sistema de favoritos e identificação real de plantas por imagem, usando a API do Pl@ntNet.

Além da área destinada aos visitantes, a aplicação conta com um ambiente administrativo para gerenciamento do catálogo e acompanhamento de informações por meio de um dashboard.

### Identidade visual

A interface foi desenvolvida com uma proposta visual inspirada na natureza, combinando tons de verde, rosa e cores suaves para transmitir leveza, acolhimento e simplicidade.

**Paleta de cores**

| Cor | Hexadecimal | Aplicação |
|---|---|---|
| Verde oliva | `#707318` | Cor principal e elementos de destaque |
| Verde claro | `#ABA415` | Elementos secundários e detalhes |
| Rosa vibrante | `#FB8BA3` | Destaques e elementos interativos |
| Rosa suave | `#FFB1C2` | Elementos decorativos |
| Pêssego | `#FFD4C9` | Fundos e detalhes |
| Branco lavanda | `#F9F8FE` | Fundo e superfícies |

**Tipografia:** Nunito, com formas arredondadas e leitura confortável.

**Design:** layout responsivo, bordas arredondadas, componentes reutilizáveis e navegação simplificada.

---

## Funcionalidades

### Exploração de plantas
- Catálogo com diferentes espécies de plantas.
- Busca por nome ou termo relacionado.
- Filtros por categoria e espécies favoritas.
- Páginas individuais com características e cuidados.
- Sistema de favoritos durante a sessão.

### Identificação de plantas por imagem (real)
- Seleção de uma foto JPEG ou PNG de até 10 MB, com prévia antes do envio.
- Indicação opcional da parte da planta fotografada (folha, flor, fruto ou casca), para melhorar a precisão.
- Análise real da fotografia pela API do [Pl@ntNet](https://plantnet.org/), especializada em reconhecimento botânico.
- Lista de espécies sugeridas, ordenada pela confiança retornada pela API, com nome científico, nomes populares, família botânica e percentual de confiança.
- Verificação automática se a espécie sugerida já existe no catálogo do FlorScan, com link direto para a página de detalhes quando houver correspondência.
- Estados de carregamento, erro de comunicação, resultado inconclusivo (nenhuma planta reconhecida) e opção de tentar novamente.
- Aviso de privacidade exibido antes do envio, informando que a foto é processada por um serviço externo e não é armazenada pelo FlorScan.

> **Importante:** os resultados são sugestões automáticas da API do Pl@ntNet e podem exigir confirmação humana — uma pontuação alta não é garantia de identificação correta.

### Autenticação
- Formulários reativos de login e cadastro, com `Validators` do Angular.
- Mensagens de erro específicas por campo, exibidas após interação ou tentativa de envio.
- Sessão demonstrativa de usuário (armazenada em `sessionStorage`).
- Diferenciação entre visitantes e administradores.
- Proteção de rotas administrativas.

### Administração
- Cadastro, edição e exclusão de espécies com formulário reativo e validação.
- Consulta dos registros existentes, com busca local sobre os dados da API.
- Restauração dos dados de exemplo (via requisições reais à API).
- Dashboard com indicadores e distribuição por categoria.

### Web API e comunicação HTTP
- API REST própria para o catálogo e os usuários, servida localmente com `json-server`.
- Comunicação via `HttpClient` do Angular, com os métodos GET, POST, PUT e DELETE.
- Tratamento de erros de comunicação (ex.: API fora do ar) com mensagens claras para o usuário.
- Estados de carregamento exibidos durante as requisições.
- Todas as operações sobre plantas e usuários são persistidas de fato na API (arquivo `db.json`), sem uso de arrays locais para simular dados.

---

## Telas da aplicação

O FlorScan possui **sete telas principais**, além de uma página para rotas não encontradas.

| Tela | Rota | Descrição |
|---|---|---|
| Início | `/` | Apresentação da plataforma, destaques, categorias e identificação de plantas por imagem (Pl@ntNet) |
| Catálogo | `/catalogo` | Exploração, pesquisa e filtragem de plantas |
| Detalhes | `/plantas/:id` | Características, cuidados e favoritos |
| Login | `/login` | Acesso à aplicação |
| Cadastro | `/cadastro` | Registro de novos usuários |
| Administração | `/administracao` | Gerenciamento completo das espécies |
| Dashboard | `/dashboard` | Indicadores e visão geral do catálogo |
| Página 404 | `/**` | Tratamento de rotas inexistentes |

As telas de administração e dashboard são restritas a usuários administradores.

---

## Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| Angular 20 | Framework principal |
| TypeScript | Lógica e tipagem da aplicação |
| HTML5 | Estrutura das interfaces |
| CSS3 | Estilização e responsividade |
| Angular Router | Navegação entre páginas |
| Angular HttpClient | Comunicação com a Web API e com o proxy de identificação |
| Angular Reactive Forms | Formulários reativos e validações (login, cadastro, espécies) |
| json-server | Web API REST local, para persistência real dos dados de plantas e usuários |
| Node.js + Express + Multer | Proxy que protege a chave da API do Pl@ntNet e repassa a imagem enviada |
| API do Pl@ntNet | Identificação real de plantas por imagem |
| Services | Organização das regras de negócio e das chamadas HTTP |
| SessionStorage | Sessão do usuário e favoritos da sessão |
| Karma e Jasmine | Testes unitários |
| Git e GitHub | Versionamento do projeto |

### Conceitos Angular aplicados

O projeto utiliza recursos fundamentais do framework:

- **Componentização:** separação de elementos reutilizáveis, como cabeçalho, rodapé e cards de plantas.
- **Roteamento:** navegação por `RouterModule`, `routerLink` e rotas dinâmicas.
- **Data Binding:** interpolação `{{ }}`, property binding, event binding e two-way binding.
- **Diretivas:** utilização de `*ngIf`, `*ngFor`, `ngModel` e classes condicionais.
- **Formulários reativos:** `FormGroup`, `FormBuilder`, `Validators` e validador customizado (confirmação de senha) nos formulários de login, cadastro de usuário e cadastro/edição de espécies.
- **HttpClient:** comunicação real com a Web API (`json-server`) e com o proxy de identificação de plantas, com tratamento de erros e estados de carregamento.
- **Services:** centralização da lógica de plantas, autenticação e identificação de plantas por imagem.
- **Guards:** controle de acesso às páginas administrativas.
- **CRUD:** operações de criação, leitura, atualização e exclusão de espécies, persistidas na API.

---

## Como executar o projeto

### Pré-requisitos

Antes de começar, é necessário ter instalado:

- Node.js compatível com Angular 20, como Node.js 22.12 ou superior em versão suportada.
- npm.
- Git, caso deseje clonar o repositório.
- Navegador web atualizado.

### 1. Clone o repositório

```bash
git clone https://github.com/delacerdaq/flor-scan.git
```

### 2. Acesse a pasta do projeto

```bash
cd flor-scan
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure a chave da API do Pl@ntNet (usada na identificação por imagem)

1. Crie uma conta gratuita em **https://my.plantnet.org/signup** (plano gratuito: 500 identificações/dia, sem cartão de crédito).
2. Gere a chave de API na área de configurações/API da sua conta em `my.plantnet.org`.
3. Copie o arquivo de exemplo e preencha a chave:

```bash
cp .env.example .env
```

4. Edite `.env` e preencha `PLANTNET_API_KEY=` com a chave obtida. O arquivo `.env` já está no `.gitignore` — nunca o compartilhe nem o versione.

> Sem essa chave, todas as outras funcionalidades do FlorScan continuam funcionando normalmente; apenas a identificação por imagem na página inicial ficará indisponível (a aplicação exibe uma mensagem explicando isso).

### 5. Inicie a Web API do catálogo (primeiro terminal)

```bash
npm run api
```

Disponível em **http://localhost:3000** (`/plantas` e `/usuarios`). Deixe este terminal aberto.

### 6. Inicie o proxy de identificação de plantas (segundo terminal)

```bash
npm run api:identificacao
```

Disponível em **http://localhost:3333**. Deixe este terminal aberto.

### 7. Inicie o Angular (terceiro terminal)

```bash
npm start
```

### 8. Acesse a aplicação

Abra o navegador em:

**http://localhost:4200/**

> Se algum dos serviços não estiver em execução, a aplicação exibirá mensagens de erro de conexão nas telas correspondentes (catálogo/detalhes/dashboard/administração para a Web API; a seção "Identificar uma planta" da página inicial para o proxy de identificação).

### Comandos adicionais

| Comando | Descrição |
|---|---|
| `npm run api` | Inicia a Web API do catálogo (json-server) na porta 3000 |
| `npm run api:identificacao` | Inicia o proxy de identificação de plantas (Pl@ntNet) na porta 3333 |
| `npm start` | Inicia o servidor de desenvolvimento Angular |
| `npm run build` | Compila o projeto |
| `npm run test` | Executa os testes em modo interativo |
| `npm run test:ci` | Executa os testes uma única vez, sem watch |
| `npx ng build --configuration production` | Gera a versão de produção |
| `npx tsc --noEmit` | Verifica os tipos TypeScript |

**Validação:** o build de produção, a verificação estrita de tipos e os 35 testes unitários foram executados com sucesso em 23/11/2026, com a Web API e o proxy de identificação em execução.

---

## Acesso demonstrativo

Para avaliar as funcionalidades administrativas, utilize a conta de demonstração:

| Campo | Credencial |
|---|---|
| E-mail | `admin@florscan.com` |
| Senha | `FlorScan123` |
| Perfil | Administrador |

Após o login, estarão disponíveis as rotas:

- `/dashboard`
- `/administracao`

Os usuários cadastrados pela interface recebem o perfil de **visitante** e não possuem acesso às funcionalidades administrativas.

> **Aviso de segurança:** o sistema de autenticação é exclusivamente demonstrativo. Os usuários são persistidos na Web API local (`db.json`), mas as senhas trafegam e ficam armazenadas em texto puro, sem hashing, tokens de sessão ou HTTPS. Não utilize senhas reais nem considere esta implementação adequada para produção.

---

## Estrutura do projeto

```text
flor-scan/
│
├── .env.example                 # Modelo das variáveis de ambiente (chave do Pl@ntNet etc.)
├── db.json                      # Banco de dados da Web API do catálogo (json-server)
├── server/
│   └── identificacao-api.js     # Proxy que protege a chave do Pl@ntNet e repassa a imagem
│
├── public/
│   └── assets/                  # Ilustrações e recursos visuais
│
├── src/
│   └── app/
│       ├── core/                # Configuração das APIs e utilitários de erro HTTP
│       │   ├── api-config.ts
│       │   └── erro-http.util.ts
│       │
│       ├── components/          # Componentes reutilizáveis
│       │   ├── header/
│       │   ├── footer/
│       │   └── planta-card/
│       │
│       ├── pages/               # Páginas da aplicação
│       │
│       ├── models/              # Interfaces e modelos de dados
│       │   ├── planta.model.ts
│       │   ├── usuario.model.ts
│       │   └── identificacao.model.ts
│       │
│       ├── data/                # Dados de exemplo (seed usado em "Restaurar exemplos")
│       │
│       ├── services/
│       │   ├── planta.service.ts
│       │   ├── auth.service.ts
│       │   └── identificacao.service.ts
│       │
│       ├── guards/
│       │   └── admin.guard.ts
│       │
│       ├── app.module.ts
│       └── app-routing.module.ts
│
├── scripts/                     # Scripts auxiliares
├── package.json
└── README.md
```

### Organização da lógica

**PlantaService:** responsável pela consulta, busca, cadastro, edição, exclusão e gerenciamento de favoritos. As operações de CRUD usam `HttpClient` contra a Web API (`/plantas`); favoritos continuam sendo um recurso de sessão do visitante, guardado em `sessionStorage`.

**AuthService:** responsável pelo cadastro, login, logout e gerenciamento de sessão dos usuários, consultando e cadastrando usuários na Web API (`/usuarios`) via `HttpClient`.

**IdentificacaoService:** envia a foto para o proxy local (`server/identificacao-api.js`), que consulta a API real do Pl@ntNet, converte a resposta para o formato usado pela aplicação e verifica se a espécie identificada já existe no catálogo do FlorScan.

**AdminGuard:** responsável por restringir o acesso às rotas administrativas.

---

## Testando as funcionalidades

Para explorar os principais recursos do FlorScan, siga este roteiro (com a Web API e, se possível, o proxy de identificação em execução):

1. Acesse o catálogo e pesquise por `rosa`.
2. Utilize o filtro de categoria **Flores**.
3. Abra os detalhes de uma espécie e adicione-a aos favoritos.
4. Ative o filtro **Somente favoritas** para visualizar os itens selecionados.
5. Na página inicial, envie uma foto JPEG ou PNG de uma planta e clique em **Identificar planta** (requer `PLANTNET_API_KEY` configurada).
6. Entre com as credenciais de administrador.
7. Acesse a administração e cadastre, edite e exclua uma planta.
8. Confira as alterações no catálogo e no dashboard.
9. Utilize **Restaurar exemplos** para recuperar os dados iniciais.
10. Cadastre um visitante e verifique as restrições de acesso.
11. Redimensione a janela para testar a responsividade e o menu móvel.
12. Atualize a página e observe a persistência dos dados.

### Persistência de dados

| Recurso | Armazenamento |
|---|---|
| Catálogo de plantas (CRUD completo) | Web API (`json-server` → `db.json`), via `HttpClient` |
| Usuários cadastrados | Web API (`json-server` → `db.json`), via `HttpClient` |
| Sessão do usuário atual | `sessionStorage` (apenas no navegador, não há sessão no servidor) |
| Favoritos | `sessionStorage` (recurso da sessão do visitante, não persiste na API) |
| Fotos enviadas para identificação | **Não são armazenadas.** Ficam em memória apenas durante a requisição ao proxy e são descartadas após a resposta do Pl@ntNet. |

As plantas e os usuários são lidos e gravados de fato na Web API — reiniciar o navegador ou atualizar a página não apaga o catálogo nem as contas criadas, desde que a API continue em execução e o arquivo `db.json` não seja apagado.

---

## Identificação de plantas por imagem

### Como funciona

1. O Angular envia a foto (via `HttpClient`, como `multipart/form-data`) para o proxy local (`server/identificacao-api.js`, porta 3333).
2. O proxy reenvia a imagem para a API oficial do Pl@ntNet (`POST https://my-api.plantnet.org/v2/identify/all`), acrescentando a chave de API guardada no servidor.
3. O Pl@ntNet analisa a imagem de fato e retorna as espécies mais prováveis, cada uma com nome científico, nomes populares, família botânica e uma pontuação de confiança.
4. O proxy devolve essa resposta ao Angular, que converte os dados, compara o nome científico com o catálogo do FlorScan e exibe os resultados.

A chave de API nunca é exposta no código Angular nem no navegador — ela fica apenas na variável de ambiente `PLANTNET_API_KEY`, lida pelo proxy Node.

### Por que existe um proxy

O Pl@ntNet exige a chave de API na própria URL da requisição (`?api-key=...`). Se o Angular chamasse a API diretamente do navegador, qualquer pessoa poderia abrir as ferramentas de desenvolvedor e copiar a chave. O proxy existe só para isso: receber a imagem do Angular, adicionar a chave no servidor e repassar a chamada.

### Como obter e configurar a chave

Veja o passo 4 de "Como executar o projeto". Resumo: crie uma conta gratuita em [my.plantnet.org/signup](https://my.plantnet.org/signup) (500 identificações/dia, sem cartão de crédito), gere a chave nas configurações da conta e cole-a em `PLANTNET_API_KEY` no arquivo `.env` (baseado em `.env.example`).

### Dados enviados ao serviço externo

Apenas a imagem selecionada pelo usuário e a parte da planta indicada (folha, flor, fruto, casca ou automático) são enviadas ao Pl@ntNet. Nenhum dado de cadastro, sessão ou e-mail do usuário é enviado. A imagem não é salva em disco pelo proxy nem gravada na Web API — ela existe só em memória durante a requisição.

### Limitações conhecidas

- O plano gratuito do Pl@ntNet permite até 500 identificações por dia; ao exceder esse limite, a aplicação exibe uma mensagem explicando a situação.
- A API aceita apenas imagens JPEG ou PNG, de até 10 MB (limite definido pelo proxy; o Pl@ntNet aceita até 50 MB por envio, mas o FlorScan envia uma imagem por vez).
- A correspondência com o catálogo do FlorScan é feita comparando nomes científicos; espécies com nomenclatura muito diferente da registrada no catálogo (ex.: variedades, cultivares) podem não ser reconhecidas automaticamente, mesmo quando a identificação do Pl@ntNet está correta.
- Resultados são sugestões automáticas — podem estar incorretos ou ser inconclusivos, especialmente em fotos de baixa qualidade ou que não mostrem claramente a planta.
- Sem uma chave configurada, a aplicação continua funcionando normalmente, exceto a identificação por imagem.

---

## Contexto acadêmico

O FlorScan foi desenvolvido como parte de um projeto acadêmico da área de Ciência da Computação, com o objetivo de aplicar conhecimentos de desenvolvimento web utilizando o framework Angular.

A implementação contempla conceitos de arquitetura baseada em componentes, rotas, diretivas, formulários reativos com validação, data binding, services e comunicação HTTP com uma Web API REST e com um serviço externo de reconhecimento de imagens.

O projeto tem caráter educacional e demonstrativo, não sendo destinado ao uso em produção.

---

## Melhorias futuras

Entre as possibilidades de evolução da aplicação estão:

- Substituir o `json-server` por uma API com banco de dados real (ex.: PostgreSQL, MongoDB) e backend próprio.
- Autenticação segura com hashing de senha, tokens (JWT) e gerenciamento de sessões no servidor.
- Permitir o envio de múltiplas fotos (diferentes órgãos da mesma planta) em uma única identificação, como o Pl@ntNet já suporta.
- Oferecer ao administrador uma ação de "cadastrar esta espécie" a partir de um resultado do Pl@ntNet ainda não presente no catálogo (com revisão humana antes de salvar).
- Ampliação do catálogo de espécies.
- Recomendações personalizadas de cuidados.

---

## Repositório

**FlorScan — Projeto acadêmico desenvolvido com Angular.**

[github.com/delacerdaq/flor-scan](https://github.com/delacerdaq/flor-scan)

*Tecnologia e natureza conectadas em uma experiência de descoberta.*