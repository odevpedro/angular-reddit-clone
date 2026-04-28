# Backlog — Angular Reddit Clone

> Registro vivo do progresso do projeto. Atualizado a cada mudanca de estado de uma funcionalidade.
> **Ultima atualizacao:** 2026-04-28

---

## Sobre o Projeto

Clone do Reddit construido com Angular 19 e Bootstrap 5 como exercicio de dominio do ecossistema Angular moderno.

**Versao atual:** `0.2.0`
**Repositorio:** [github.com/odevpedro/angular-reddit-clone](https://github.com/odevpedro/angular-reddit-clone)
**Stack principal:** Angular 19.2, Bootstrap 5.3, TypeScript 5.7

---

## Legenda

| Simbolo | Significado |
|---------|-------------|
| `[ ]`   | Pendente |
| `[~]`   | Em andamento |
| `[x]`   | Concluido |
| `P0`    | Critico — bloqueia outras features |
| `P1`    | Alta prioridade |
| `P2`    | Media prioridade |
| `P3`    | Melhoria / nice-to-have |
| `XS` `S` `M` `L` `XL` | Estimativa de complexidade |

---

## Em Andamento

> Nenhuma feature em andamento no momento.

---

## Pendentes

### Integracao com Backend (fase futura)

| Status | Prioridade | Tamanho | Tarefa |
|--------|------------|---------|--------|
| `[ ]`  | P1         | XL      | Substituir dados mockados por chamadas HTTP reais |
| `[ ]`  | P1         | M       | HTTP interceptor para injecao de token JWT |
| `[x]`  | P2         | M       | Persistir estado de autenticacao no localStorage |

### Qualidade

| Status | Prioridade | Tamanho | Tarefa |
|--------|------------|---------|--------|
| `[ ]`  | P2         | M       | Testes unitarios para LoginComponent e RegisterComponent |
| `[ ]`  | P3         | L       | Testes unitarios para HomeComponent, PostCardComponent e CommentComponent |

---

## Concluidas

| Data       | Tarefa |
|------------|--------|
| 2026-04-17 | Scaffold inicial com Angular CLI 19.2.6 |
| 2026-04-17 | Bootstrap 5.3 instalado e importado em styles.css |
| 2026-04-17 | HeaderComponent com navbar Bootstrap (logo, busca, botoes de auth) |
| 2026-04-17 | AppComponent refatorado para layout base (header + router-outlet) |
| 2026-04-17 | app.routes.ts configurado com rota raiz lazy loading |
| 2026-04-17 | Post model e PostService com 7 posts mockados e logica de voto |
| 2026-04-17 | PostCardComponent com upvote/downvote, metadata e RouterLink |
| 2026-04-17 | HomeComponent com feed de posts e ordenacao (Quente, Novo, Top) |
| 2026-04-17 | Comment model e CommentService com 15 comentarios mockados e arvore recursiva |
| 2026-04-17 | CommentComponent standalone recursivo com upvote/downvote e resposta inline |
| 2026-04-17 | Subreddit model e SubredditService com 5 subreddits mockados |
| 2026-04-17 | SubredditComponent com banner, descricao, regras e feed filtrado |
| 2026-04-17 | Rota dinamica /r/:subreddit com lazy loading |
| 2026-04-17 | PostDetailComponent com post completo e arvore de comentarios |
| 2026-04-17 | Rota dinamica /r/:subreddit/comments/:id com lazy loading |
| 2026-04-17 | User model e AuthService com login, registro e logout (BehaviorSubject) |
| 2026-04-17 | LoginComponent com formulario reativo e validacao |
| 2026-04-17 | RegisterComponent com formulario reativo, validacao e confirmacao de senha |
| 2026-04-17 | AuthGuard funcional protegendo rotas autenticadas |
| 2026-04-17 | Header atualizado com estado de autenticacao (usuario logado vs. botoes de auth) |
| 2026-04-17 | Pagina 404 customizada (NotFoundComponent) |
| 2026-04-17 | Loading bar animada no topo durante navegacao lazy |
| 2026-04-17 | Busca funcional no header com debounce 300ms (filtra titulo, subreddit e autor) |
| 2026-04-17 | Paginacao "Carregar mais" no feed com contador de posts restantes |
| 2026-04-17 | Dark Mode com Bootstrap 5.3 data-bs-theme, toggle no header e persistencia em localStorage |
| 2026-04-17 | .gitattributes configurado para TypeScript aparecer como linguagem principal no GitHub |
| 2026-04-28 | Testes unitarios criados para todos os servicos (AuthService, PostService, CommentService, SearchService, ThemeService, SubredditService), AuthGuard e AppComponent — 64 testes passando |

---

## Bugs Conhecidos

| ID | Descricao | Severidade | Reportado em |
|----|-----------|------------|--------------|
| —  | Nenhum bug conhecido no momento | — | — |

---

## Notas e Decisoes Pendentes

- Dados sao todos mockados — sem backend real por enquanto
- Gerenciamento de estado usa RxJS BehaviorSubject em servicos (decisao tomada: sem NgRx nesta fase)

---

## Historico de Versoes

| Versao  | Data       | Principais entregas |
|---------|------------|---------------------|
| `0.0.0` | 2026-04-17 | Scaffold Angular CLI, Bootstrap, HeaderComponent |
| `0.1.0` | 2026-04-17 | Frontend completo: Home, Subreddit, PostDetail, Auth, votos e comentarios |
| `0.2.0` | 2026-04-17 | UX: 404, loading bar, busca, paginacao, dark mode |
