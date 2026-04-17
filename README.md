# Angular Reddit Clone

> Interface web que replica as funcionalidades principais do Reddit: listagem de posts, votos, comentarios e navegacao por subreddits.

[![Last Commit](https://img.shields.io/github/last-commit/odevpedro/angular-reddit-clone?style=flat-square)](https://github.com/odevpedro/angular-reddit-clone/commits/master)
[![License](https://img.shields.io/github/license/odevpedro/angular-reddit-clone?style=flat-square)](./LICENSE)

---

## Sobre o Projeto

Clone do Reddit construido com Angular 19 e Bootstrap 5. O objetivo e reproduzir as principais interacoes da plataforma — feed de posts com votos, paginas de subreddit, threads de comentarios e autenticacao de usuario — como exercicio de dominio do ecossistema Angular moderno (standalone components, signals, lazy routing).

---

## Stack e Arquitetura

| Camada        | Tecnologia                        |
|---------------|-----------------------------------|
| Runtime       | Node.js 22 (Angular CLI 19.2.6)   |
| Framework     | Angular 19.2                      |
| Estilos       | Bootstrap 5.3                     |
| Linguagem     | TypeScript 5.7                    |
| Testes unit.  | Karma + Jasmine                   |
| Roteamento    | Angular Router (lazy loading)     |
| Estado        | Servicos com RxJS / Signals       |

Padrao arquitetural: **Feature Modules com Standalone Components**. Cada feature e um diretorio isolado com seus proprios componentes, servicos e rotas carregados de forma lazy.

---

## Estrutura de Pastas

```
src/
├── app/
│   ├── core/             # Servicos globais, guards, interceptors, modelos
│   ├── shared/           # Componentes e pipes reutilizaveis
│   ├── header/           # Componente de cabecalho global
│   ├── home/             # Feed principal de posts (TODO)
│   ├── subreddit/        # Pagina de subreddit (TODO)
│   ├── post/             # Thread de post + comentarios (TODO)
│   ├── auth/             # Login e cadastro (TODO)
│   ├── app.component.ts  # Raiz da aplicacao
│   ├── app.config.ts     # Bootstrap da aplicacao (standalone)
│   └── app.routes.ts     # Rotas raiz com lazy loading
├── styles.css            # Estilos globais + import do Bootstrap
└── index.html

docs/
└── system-feature-flows.md
```

---

## Como Rodar Localmente

### Pre-requisitos

- Node.js 18+
- Angular CLI 19: `npm install -g @angular/cli`

### Setup

```bash
# 1. Clone o repositorio
git clone https://github.com/odevpedro/angular-reddit-clone.git
cd angular-reddit-clone

# 2. Instale as dependencias
npm install

# 3. Inicie o servidor de desenvolvimento
npm start
```

A aplicacao estara disponivel em `http://localhost:4200`.

---

## Testes

```bash
# Executa os testes unitarios com Karma
npm test

# Build de producao
npm run build
```

---

## Documentacao Tecnica

| Documento                                                     | Descricao                              |
|---------------------------------------------------------------|----------------------------------------|
| [Fluxos de Funcionalidades](./docs/system-feature-flows.md)   | Fluxo interno de cada feature          |
| [Backlog](./backlog.md)                                       | Status de desenvolvimento do projeto   |

---

## Status do Projeto

```
[x] Scaffold inicial com Angular CLI 19
[x] Bootstrap 5.3 configurado
[x] Componente Header criado
[ ] Layout base (header fixo + router-outlet)
[ ] Feature: Home — feed de posts
[ ] Feature: Subreddit — pagina de comunidade
[ ] Feature: Post — thread com comentarios
[ ] Feature: Auth — login e cadastro
[ ] Feature: Votacao de posts e comentarios
```

---

## Contribuindo

1. Fork o repositorio
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Commit suas mudancas: `git commit -m 'feat: adiciona minha feature'`
4. Push: `git push origin feature/minha-feature`
5. Abra um Pull Request descrevendo o que foi feito

Siga o padrao [Conventional Commits](https://www.conventionalcommits.org/pt-br/).

---

## Licenca

Distribuido sob a licenca MIT. Veja [LICENSE](./LICENSE) para mais informacoes.

---

<p align="center">
  Feito com foco em qualidade por <a href="https://github.com/odevpedro">@odevpedro</a>
</p>
