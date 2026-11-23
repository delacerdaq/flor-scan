# 🌿 FlorScan

**Explore a natureza, descubra espécies e cultive conhecimento.**

O FlorScan é uma aplicação web desenvolvida em Angular para explorar espécies de plantas e aprender sobre seus cuidados. A plataforma reúne um catálogo pesquisável, identificação real de plantas por imagem (API do Pl@ntNet), sistema de favoritos, autenticação e uma área administrativa com dashboard. Os dados de plantas e usuários são persistidos em uma Web API REST local.

Projeto acadêmico da disciplina de Desenvolvimento Web Front-End, do curso de Ciência da Computação da Universidade FUMEC, desenvolvido por **Ana Luiza de Lacerda** e **Gabriel Batista Silva**.

---

## Identidade visual

A identidade visual utiliza verde-oliva, rosa e tons suaves, com a fonte Nunito e bordas arredondadas.

| Cor | Hex | Uso |
|---|---|---|
| Verde oliva | `#707318` | Principal / destaques |
| Verde claro | `#ABA415` | Secundária |
| Rosa vibrante | `#FB8BA3` | Elementos interativos |
| Rosa suave | `#FFB1C2` | Elementos decorativos |
| Pêssego | `#FFD4C9` | Fundos |
| Branco lavanda | `#F9F8FE` | Superfícies |

---

## O que o FlorScan faz

- **Catálogo de plantas:** pesquisa, filtros por categoria, favoritos e páginas de detalhes com informações sobre cuidados.
- **Identificação real por imagem:** envie uma foto e a API do [Pl@ntNet](https://plantnet.org/) analisa de fato a imagem, retornando nome científico, nomes populares, família botânica e confiança — com link direto para a espécie no catálogo, quando ela já existir.
- **Contas de usuário:** cadastro e login com formulários reativos e validações.
- **Perfis de acesso:** diferencia visitantes e administradores.
- **Administração:** cadastro, consulta, edição e exclusão de espécies.
- **Dashboard:** apresenta indicadores e distribuição das plantas por categoria.
- **Persistência:** plantas e usuários são consultados e gravados na Web API local.

> **Sobre a identificação:** os resultados são sugestões automáticas da API do Pl@ntNet — uma confiança alta não é garantia de identificação correta, e cabe revisão humana.

### Autenticação

- Formulários reativos de login e cadastro, com validadores do Angular.
- Mensagens de erro específicas por campo.
- Cadastro de usuários com perfil de visitante.
- Sessão do usuário armazenada em `sessionStorage`.
- Diferenciação entre visitantes e administradores.
- Proteção das rotas administrativas.

### Administração

- Cadastro, edição e exclusão de espécies.
- Consulta dos registros existentes.
- Busca local sobre os dados recebidos da API.
- Restauração dos dados de exemplo por meio de requisições à API.
- Dashboard com indicadores e distribuição por categoria.

### Web API e comunicação HTTP

- API REST local servida com `json-server`.
- Comunicação por meio do `HttpClient` do Angular.
- Utilização dos métodos GET, POST, PUT e DELETE.
- Tratamento de erros de comunicação, como quando a API está indisponível.
- Estados de carregamento durante as requisições.
- Persistência dos dados no arquivo `db.json`.

---

## Telas da aplicação

O FlorScan possui sete telas principais, além de uma página para rotas não encontradas.

| Tela | Rota | Descrição |
|---|---|---|
| Início | `/` | Apresentação da plataforma, destaques, categorias e identificação de plantas por imagem (Pl@ntNet) |
| Catálogo | `/catalogo` | Exploração, pesquisa e filtragem de plantas |
| Detalhes | `/plantas/:id` | Características, cuidados e favoritos |
| Login | `/login` | Acesso à aplicação |
| Cadastro | `/cadastro` | Registro de novos usuários |
| Administração | `/administracao` | Gerenciamento das espécies |
| Dashboard | `/dashboard` | Indicadores e visão geral do catálogo |
| Página 404 | `/**` | Tratamento de rotas inexistentes |

---

## Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| Angular 20 | Framework principal |
| TypeScript | Lógica e tipagem da aplicação |
| HTML5 | Estrutura das interfaces |
| SCSS / CSS3 | Estilização e responsividade |
| Angular Router | Navegação entre páginas |
| Angular HttpClient | Comunicação com a Web API e com o proxy de identificação |
| Angular Reactive Forms | Formulários e validações |
| json-server | Web API REST local (catálogo e usuários) |
| Node.js + Express + Multer | Proxy que protege a chave da API do Pl@ntNet e repassa a imagem |
| API do Pl@ntNet | Identificação real de plantas por imagem |
| RxJS | Programação reativa |
| SessionStorage | Armazenamento da sessão e dos favoritos |
| Karma e Jasmine | Testes unitários |
| Git e GitHub | Versionamento do projeto |

### Conceitos Angular aplicados

- **Componentização:** separação de elementos reutilizáveis, como cabeçalho, rodapé e cards de plantas.
- **Roteamento:** navegação com Angular Router, `routerLink` e rotas dinâmicas.
- **Data Binding:** interpolação, property binding, event binding e two-way binding.
- **Diretivas:** utilização de `*ngIf`, `*ngFor`, `ngModel` e classes condicionais.
- **Formulários reativos:** utilização de `FormGroup`, `FormBuilder`, `Validators` e validação customizada para confirmação de senha.
- **HttpClient:** comunicação com a Web API, incluindo tratamento de erros e estados de carregamento.
- **Services:** centralização das operações relacionadas a plantas, autenticação e identificação de plantas por imagem.
- **Guards:** controle de acesso às páginas administrativas.
- **CRUD:** criação, leitura, atualização e exclusão de espécies, com persistência na API.

---

## Como executar o projeto

### Requisitos

- Node.js 22.12 ou superior.
- npm.

### 1. Baixe o projeto

```bash
git clone https://github.com/delacerdaq/flor-scan.git
cd flor-scan
```

Se você já possui o projeto em sua máquina, entre na pasta dele.

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a chave da API do Pl@ntNet

1. Crie uma conta gratuita em **https://my.plantnet.org/signup** (500 identificações/dia, sem cartão de crédito).
2. Gere a chave nas configurações/API da sua conta.
3. `cp .env.example .env` e preencha `PLANTNET_API_KEY=` com a chave. O `.env` já está no `.gitignore` — nunca o versione.

> Sem a chave, o resto do FlorScan funciona normalmente; só a identificação por foto fica indisponível.

### 4. Inicie a Web API do catálogo

Em um terminal, execute:

```bash
npm run api
```

Disponível em `http://localhost:3000`, com os recursos `/plantas` e `/usuarios`. **Mantenha esse terminal aberto.**

### 5. Inicie o proxy de identificação

Em outro terminal:

```bash
npm run api:identificacao
```

Disponível em `http://localhost:3333`. **Mantenha esse terminal aberto.**

### 6. Inicie o Angular

Em um terceiro terminal, na pasta do projeto, execute:

```bash
npm start
```

### 7. Acesse a aplicação

Abra o navegador em:

`http://localhost:4200/`

> Se algum dos serviços não estiver em execução, as telas correspondentes exibirão mensagens claras de erro de conexão.

### Comandos disponíveis

| Comando | Descrição |
|---|---|
| `npm run api` | Inicia a Web API do catálogo na porta 3000 |
| `npm run api:identificacao` | Inicia o proxy de identificação (Pl@ntNet) na porta 3333 |
| `npm start` | Inicia o servidor de desenvolvimento Angular |
| `npm run build` | Compila o projeto |
| `npm run test` | Executa os testes em modo interativo |
| `npm run test:ci` | Executa os testes uma única vez, sem watch |
| `npx ng build --configuration production` | Gera a versão de produção |
| `npx tsc --noEmit` | Verifica os tipos TypeScript |

**Validação registrada:** em 23/11/2026, o build de produção, a verificação de tipos e os 35 testes unitários foram executados com sucesso, com a Web API e o proxy de identificação em funcionamento.

---

## Acesso demonstrativo

Para testar as funcionalidades administrativas, utilize:

| Campo | Credencial |
|---|---|
| E-mail | `admin@florscan.com` |
| Senha | `FlorScan123` |
| Perfil | Administrador |

Após o login, estarão disponíveis as rotas:

- `/dashboard`
- `/administracao`

Os usuários cadastrados pela interface recebem o perfil de **visitante** e não possuem acesso às funcionalidades administrativas.

> **Aviso de segurança:** a autenticação é demonstrativa. Os usuários são persistidos na Web API local, mas as senhas ficam armazenadas em texto puro, sem hashing, tokens de sessão ou HTTPS. Não utilize senhas reais. Esta implementação não é adequada para produção.

---

## Estrutura do projeto

```text
flor-scan/
│
├── .env.example                 # Modelo das variáveis de ambiente (chave do Pl@ntNet)
├── db.json                      # Banco de dados da Web API do catálogo (json-server)
├── server/
│   └── identificacao-api.js     # Proxy que protege a chave do Pl@ntNet e repassa a imagem
│
├── public/
│   └── assets/                  # Ilustrações e recursos visuais
│
├── src/
│   └── app/
│       ├── core/                # Configuração das APIs e utilitários HTTP
│       │   ├── api-config.ts
│       │   └── erro-http.util.ts
│       ├── components/          # Componentes reutilizáveis
│       │   ├── header/
│       │   ├── footer/
│       │   └── planta-card/
│       ├── pages/               # Páginas da aplicação
│       ├── models/              # Interfaces e modelos de dados
│       │   └── identificacao.model.ts
│       ├── data/                # Dados de exemplo para restauração
│       ├── services/            # Serviços da aplicação
│       │   ├── planta.service.ts
│       │   ├── auth.service.ts
│       │   └── identificacao.service.ts
│       ├── guards/              # Proteção de rotas
│       │   └── admin.guard.ts
│       ├── app.module.ts
│       └── app-routing.module.ts
│
├── scripts/                     # Scripts auxiliares
├── package.json
└── README.md
```

---

## Serviços principais

- **PlantaService:** responsável pela consulta, busca, cadastro, edição, exclusão e gerenciamento de favoritos. As operações de CRUD utilizam `HttpClient` para acessar o recurso `/plantas` da Web API. Os favoritos são armazenados em `sessionStorage`.
- **AuthService:** responsável pelo cadastro, login, logout e gerenciamento da sessão dos usuários. O cadastro e a consulta utilizam `HttpClient` para acessar o recurso `/usuarios`; a sessão atual fica em `sessionStorage`.
- **IdentificacaoService:** envia a foto ao proxy local (`server/identificacao-api.js`), que consulta a API real do Pl@ntNet, converte a resposta e verifica se a espécie já existe no catálogo.
- **AdminGuard:** restringe o acesso às rotas administrativas a usuários com perfil de administrador.

---

## Testando as funcionalidades

Com a Web API e o proxy de identificação em execução, siga este roteiro:

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
| Catálogo de plantas | Web API (`json-server` → `db.json`), via `HttpClient` |
| Usuários cadastrados | Web API (`json-server` → `db.json`), via `HttpClient` |
| Sessão do usuário atual | `sessionStorage` |
| Favoritos | `sessionStorage` |
| Fotos enviadas para identificação | **Não são armazenadas** — ficam em memória só durante a requisição ao proxy |

As plantas e os usuários são lidos e gravados na Web API. Atualizar a página ou reiniciar o navegador não apaga esses registros, desde que a API continue utilizando o mesmo arquivo `db.json`. A sessão e os favoritos, por outro lado, ficam no armazenamento da sessão do navegador.

---

## Avisos importantes

- **Identificação por imagem:** usa a API real do Pl@ntNet; os resultados são sugestões automáticas e podem exigir confirmação humana. A foto é enviada só para esse fim e não é armazenada pelo FlorScan.
- **Autenticação demonstrativa:** não utiliza hashing de senhas, tokens ou HTTPS. Não deve ser utilizada em produção.
- **Favoritos:** ficam em `sessionStorage` e não são persistidos na Web API.
- **Caráter do projeto:** a aplicação tem finalidade educacional e demonstrativa.

---

## Documentação complementar

O desenvolvimento e as decisões do projeto também estão registrados nos documentos:

- [`docs/relatorio-desenvolvimento-completo.md`](docs/relatorio-desenvolvimento-completo.md) — relatório técnico do desenvolvimento.
- [`docs/relatorio-academico.md`](docs/relatorio-academico.md) — relatório da entrega acadêmica.

---

## Melhorias futuras

- Permitir o envio de múltiplas fotos (diferentes partes da mesma planta) em uma única identificação.
- Oferecer ao administrador uma ação de "cadastrar esta espécie" a partir de um resultado do Pl@ntNet ainda não presente no catálogo, com revisão humana antes de salvar.
- Substituir o `json-server` por uma API própria integrada a um banco de dados.
- Implementar autenticação segura, com hashing de senhas, tokens e gerenciamento de sessões no servidor.
- Ampliar o catálogo de espécies.
- Desenvolver recomendações personalizadas de cuidados.

---

**[github.com/delacerdaq/flor-scan](https://github.com/delacerdaq/flor-scan)** · *Tecnologia e natureza conectadas em uma experiência de descoberta.*
