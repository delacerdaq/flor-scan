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
- Formulários de login e cadastro com validação.
- Sessão demonstrativa de usuário.
- Diferenciação entre visitantes e administradores.
- Proteção de rotas administrativas.

### Administração
- Cadastro de novas espécies.
- Consulta e edição dos registros existentes.
- Exclusão de plantas.
- Restauração dos dados de exemplo.
- Dashboard com indicadores e distribuição por categoria.

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
| Angular Forms | Formulários e validações |
| Services | Organização das regras de negócio |
| LocalStorage | Persistência local de dados |
| SessionStorage | Armazenamento temporário de favoritos |
| Karma e Jasmine | Testes unitários |
| Git e GitHub | Versionamento do projeto |

### Conceitos Angular aplicados

O projeto utiliza recursos fundamentais do framework:

- **Componentização:** separação de elementos reutilizáveis, como cabeçalho, rodapé e cards de plantas.
- **Roteamento:** navegação por `RouterModule`, `routerLink` e rotas dinâmicas.
- **Data Binding:** interpolação `{{ }}`, property binding, event binding e two-way binding.
- **Diretivas:** utilização de `*ngIf`, `*ngFor`, `ngModel` e classes condicionais.
- **Services:** centralização da lógica de plantas, autenticação e identificação demonstrativa.
- **Guards:** controle de acesso às páginas administrativas.
- **CRUD:** operações de criação, leitura, atualização e exclusão de espécies.
- **Mock Objects:** simulação de dados sem necessidade de uma API externa.

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

### 4. Inicie o servidor de desenvolvimento

```bash
npm start
```

### 5. Acesse a aplicação

Abra o navegador em:

**http://localhost:4200/**

### Comandos adicionais

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o servidor de desenvolvimento |
| `npm run build` | Compila o projeto |
| `npm run test` | Executa os testes em modo interativo |
| `npm run test:ci` | Executa os testes uma única vez, sem watch |
| `npx ng build --configuration production` | Gera a versão de produção |
| `npx tsc --noEmit` | Verifica os tipos TypeScript |

**Validação:** o build de produção, a verificação estrita de tipos e os testes unitários foram executados com sucesso em 04/11/2026.

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

> **Aviso de segurança:** o sistema de autenticação é exclusivamente demonstrativo. As credenciais são armazenadas localmente, sem criptografia. Não utilize senhas reais nem considere essa implementação adequada para produção.

---

## Estrutura do projeto

```text
flor-scan/
│
├── public/
│   └── assets/                  # Ilustrações e recursos visuais
│
├── src/
│   └── app/
│       ├── components/          # Componentes reutilizáveis
│       │   ├── header/
│       │   ├── footer/
│       │   └── planta-card/
│       │
│       ├── pages/               # Páginas da aplicação
│       │
│       ├── models/              # Interfaces e modelos de dados
│       │
│       ├── data/                # Dados fictícios das plantas
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

**PlantaService:** responsável pela consulta, busca, cadastro, edição, exclusão e gerenciamento de favoritos.

**AuthService:** responsável pelo cadastro, login, logout e gerenciamento de sessão dos usuários.

**IdentificacaoService:** responsável pela sugestão demonstrativa de espécies, sem processamento real da imagem.

**AdminGuard:** responsável por restringir o acesso às rotas administrativas.

---

## Testando as funcionalidades

Para explorar os principais recursos do FlorScan, siga este roteiro:

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

A aplicação utiliza o armazenamento do navegador para simular a persistência de informações.

| Recurso | Armazenamento |
|---|---|
| Catálogo e operações CRUD | `localStorage` |
| Usuários demonstrativos | `localStorage` |
| Favoritos | `sessionStorage` |

Como não existe integração com um banco de dados remoto, os dados permanecem vinculados ao armazenamento local do navegador.

---

## Contexto acadêmico

O FlorScan foi desenvolvido como parte de um projeto acadêmico da área de Ciência da Computação, com o objetivo de aplicar conhecimentos de desenvolvimento web utilizando o framework Angular.

A implementação contempla conceitos de arquitetura baseada em componentes, rotas, diretivas, formulários, data binding, services e manipulação de objetos simulados.

O projeto tem caráter educacional e demonstrativo, não sendo destinado ao uso em produção.

---

## Melhorias futuras

Entre as possibilidades de evolução da aplicação estão:

- Integração com uma API REST e banco de dados.
- Autenticação segura com gerenciamento de sessões no servidor.
- Identificação real de plantas por inteligência artificial.
- Upload e armazenamento remoto de imagens.
- Ampliação do catálogo de espécies.
- Recomendações personalizadas de cuidados.

---

## Repositório

**FlorScan — Projeto acadêmico desenvolvido com Angular.**

[github.com/delacerdaq/flor-scan](https://github.com/delacerdaq/flor-scan)

*Tecnologia e natureza conectadas em uma experiência de descoberta.*