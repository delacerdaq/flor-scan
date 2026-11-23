# FlorScan

**Explore a natureza, descubra espécies e cultive conhecimento.**

O **FlorScan** é uma aplicação web desenvolvida com Angular que permite explorar espécies de plantas, conhecer suas características, consultar orientações de cuidados e organizar espécies favoritas em uma experiência intuitiva e responsiva.

O projeto foi desenvolvido para fins acadêmicos, com foco na aplicação de conceitos de desenvolvimento front-end, componentização, roteamento, manipulação de dados e organização de uma aplicação Angular.

---

## Sobre o projeto

O FlorScan nasceu da proposta de aproximar as pessoas do universo das plantas por meio da tecnologia.

A plataforma reúne um catálogo interativo de espécies, informações sobre cultivo e manutenção, um sistema de favoritos e uma experiência demonstrativa de identificação de plantas por imagem.

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

### Identificação demonstrativa
- Seleção de imagens nos formatos JPG e PNG.
- Pré-visualização da imagem enviada.
- Sugestão demonstrativa de uma espécie do catálogo.
- Navegação para a página de detalhes da espécie sugerida.

> **Importante:** a identificação por imagem é uma simulação acadêmica. A aplicação não utiliza inteligência artificial nem realiza reconhecimento visual real.

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
- API REST própria, servida localmente com `json-server`.
- Comunicação via `HttpClient` do Angular, com os métodos GET, POST, PUT e DELETE.
- Tratamento de erros de comunicação (ex.: API fora do ar) com mensagens claras para o usuário.
- Estados de carregamento exibidos durante as requisições.
- Todas as operações sobre plantas e usuários são persistidas de fato na API (arquivo `db.json`), sem uso de arrays locais para simular dados.

---

## Telas da aplicação

O FlorScan possui **sete telas principais**, além de uma página para rotas não encontradas.

| Tela | Rota | Descrição |
|---|---|---|
| Início | `/` | Apresentação da plataforma, destaques, categorias e identificação demonstrativa |
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
| Angular HttpClient | Comunicação com a Web API (GET, POST, PUT, DELETE) |
| Angular Reactive Forms | Formulários reativos e validações (login, cadastro, espécies) |
| json-server | Web API REST local, para persistência real dos dados |
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
- **HttpClient:** comunicação real com a Web API (`json-server`), com tratamento de erros e estados de carregamento.
- **Services:** centralização da lógica de plantas, autenticação e identificação demonstrativa.
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

### 4. Inicie a Web API (primeiro terminal)

A aplicação consome dados de uma API REST local, servida com `json-server` a partir do arquivo `db.json`:

```bash
npm run api
```

A API ficará disponível em **http://localhost:3000** (`/plantas` e `/usuarios`). Deixe este terminal aberto.

### 5. Inicie o Angular (segundo terminal)

Em um novo terminal, na mesma pasta do projeto:

```bash
npm start
```

### 6. Acesse a aplicação

Abra o navegador em:

**http://localhost:4200/**

> Se a API não estiver em execução, a aplicação exibirá mensagens de erro de conexão nas telas que dependem dos dados de plantas (início, catálogo, detalhes, dashboard e administração).

### Comandos adicionais

| Comando | Descrição |
|---|---|
| `npm run api` | Inicia a Web API local (json-server) na porta 3000 |
| `npm start` | Inicia o servidor de desenvolvimento Angular |
| `npm run build` | Compila o projeto |
| `npm run test` | Executa os testes em modo interativo |
| `npm run test:ci` | Executa os testes uma única vez, sem watch |
| `npx ng build --configuration production` | Gera a versão de produção |
| `npx tsc --noEmit` | Verifica os tipos TypeScript |

**Validação:** o build de produção, a verificação estrita de tipos e os 21 testes unitários foram executados com sucesso em 23/11/2026, com a Web API em execução.

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
├── db.json                      # Banco de dados da Web API (json-server)
├── public/
│   └── assets/                  # Ilustrações e recursos visuais
│
├── src/
│   └── app/
│       ├── core/                # Configuração da API e utilitários de erro HTTP
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

**AuthService:** responsável pelo cadastro, login, logout e gerenciamento de sessão dos usuários, consultando e cadastrando usuários na Web API (`/usuarios`) via `HttpClient`. A sessão atual continua em `sessionStorage`, pois não há backend de sessão.

**IdentificacaoService:** responsável pela sugestão demonstrativa de espécies, sem processamento real da imagem.

**AdminGuard:** responsável por restringir o acesso às rotas administrativas.

---

## Testando as funcionalidades

Para explorar os principais recursos do FlorScan, siga este roteiro (com a Web API em execução, `npm run api`):

1. Acesse o catálogo e pesquise por `rosa`.
2. Utilize o filtro de categoria **Flores**.
3. Abra os detalhes de uma espécie e adicione-a aos favoritos.
4. Ative o filtro **Somente favoritas** para visualizar os itens selecionados.
5. Na página inicial, envie uma imagem JPG ou PNG e utilize a sugestão demonstrativa.
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

As plantas e os usuários são lidos e gravados de fato na Web API — reiniciar o navegador ou atualizar a página não apaga o catálogo nem as contas criadas, desde que a API continue em execução e o arquivo `db.json` não seja apagado.

---

## Contexto acadêmico

O FlorScan foi desenvolvido como parte de um projeto acadêmico da área de Ciência da Computação, com o objetivo de aplicar conhecimentos de desenvolvimento web utilizando o framework Angular.

A implementação contempla conceitos de arquitetura baseada em componentes, rotas, diretivas, formulários reativos com validação, data binding, services e comunicação HTTP com uma Web API REST.

O projeto tem caráter educacional e demonstrativo, não sendo destinado ao uso em produção.

---

## Melhorias futuras

Entre as possibilidades de evolução da aplicação estão:

- Substituir o `json-server` por uma API com banco de dados real (ex.: PostgreSQL, MongoDB) e backend próprio.
- Autenticação segura com hashing de senha, tokens (JWT) e gerenciamento de sessões no servidor.
- Identificação real de plantas por inteligência artificial (recurso opcional, não concluído nesta entrega — ver seção de pendências abaixo).
- Upload e armazenamento remoto de imagens.
- Ampliação do catálogo de espécies.
- Recomendações personalizadas de cuidados.

### Identificação por imagem (funcionalidade opcional)

A identificação automática de flores por imagem, marcada como opcional no planejamento do projeto, **não foi implementada nesta entrega**. A tela inicial mantém a simulação acadêmica já existente (sugestão baseada no nome do arquivo enviado, sem análise real da imagem), deixando clara essa limitação para quem avaliar o projeto.

---

## Repositório

**FlorScan — Projeto acadêmico desenvolvido com Angular.**

[github.com/delacerdaq/flor-scan](https://github.com/delacerdaq/flor-scan)

*Tecnologia e natureza conectadas em uma experiência de descoberta.*