# Backlog — Angular Reddit Clone

> Registro vivo do progresso do projeto. Atualizado a cada mudanca de estado de uma funcionalidade.
> **Ultima atualizacao:** 2026-04-17

---

## Sobre o Projeto

Clone do Reddit construido com Angular 19 e Bootstrap 5 como exercicio de dominio do ecossistema Angular moderno.

**Versao atual:** `0.0.0`
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

> Features atualmente sendo desenvolvidas. Idealmente, maximo de 2-3 itens simultaneos.

<!-- Nenhuma feature em andamento no momento -->

---

## Pendentes

### Infraestrutura

| Status | Prioridade | Tamanho | Tarefa |
|--------|------------|---------|--------|
| `[ ]`  | P0         | S       | Substituir template padrao do AppComponent pelo layout base (header + router-outlet) |
| `[ ]`  | P0         | S       | Implementar template HTML e CSS do HeaderComponent com navbar Bootstrap |
| `[ ]`  | P0         | XS      | Configurar rota raiz com lazy loading no app.routes.ts |

### Feature: Home — Feed de Posts

| Status | Prioridade | Tamanho | Tarefa |
|--------|------------|---------|--------|
| `[ ]`  | P1         | M       | Criar componente PostCardComponent (titulo, autor, subreddit, votos, nr. comentarios) |
| `[ ]`  | P1         | M       | Criar PostService com dados mockados (lista de posts) |
| `[ ]`  | P1         | M       | Criar pagina HomeComponent com feed de PostCards |
| `[ ]`  | P2         | S       | Adicionar ordenacao do feed (Quente, Novo, Top) |

### Feature: Subreddit

| Status | Prioridade | Tamanho | Tarefa |
|--------|------------|---------|--------|
| `[ ]`  | P1         | M       | Criar SubredditComponent com banner, descricao e feed filtrado |
| `[ ]`  | P2         | S       | Criar SubredditService com dados mockados |
| `[ ]`  | P2         | XS      | Rota dinamica `/r/:subreddit` com lazy loading |

### Feature: Post — Thread com Comentarios

| Status | Prioridade | Tamanho | Tarefa |
|--------|------------|---------|--------|
| `[ ]`  | P1         | L       | Criar PostDetailComponent com titulo, corpo e secao de comentarios |
| `[ ]`  | P1         | M       | Criar CommentComponent recursivo para comentarios aninhados |
| `[ ]`  | P2         | S       | Rota dinamica `/r/:subreddit/comments/:id` |

### Feature: Auth

| Status | Prioridade | Tamanho | Tarefa |
|--------|------------|---------|--------|
| `[ ]`  | P2         | M       | Criar LoginComponent com formulario reativo |
| `[ ]`  | P2         | M       | Criar AuthService com estado de usuario (BehaviorSubject) |
| `[ ]`  | P2         | S       | AuthGuard para rotas protegidas |
| `[ ]`  | P3         | M       | Criar RegisterComponent |

### Feature: Votacao

| Status | Prioridade | Tamanho | Tarefa |
|--------|------------|---------|--------|
| `[ ]`  | P2         | M       | Adicionar upvote/downvote em PostCardComponent |
| `[ ]`  | P3         | M       | Adicionar upvote/downvote em CommentComponent |

---

## Concluidas

| Data       | Tarefa |
|------------|--------|
| 2026-04-17 | Scaffold inicial com Angular CLI 19.2.6 |
| 2026-04-17 | Bootstrap 5.3 instalado e importado em styles.css |
| 2026-04-17 | HeaderComponent gerado via Angular CLI |

---

## Bugs Conhecidos

| ID | Descricao | Severidade | Reportado em |
|----|-----------|------------|--------------|
| —  | Nenhum bug conhecido no momento | — | — |

---

## Notas e Decisoes Pendentes

- Definir se o estado global sera gerenciado com RxJS (BehaviorSubject em services) ou Angular Signals
- Definir se havera integracao com API real ou se o projeto permanecera com dados mockados
- Avaliar uso de NgRx para escalar o gerenciamento de estado se a aplicacao crescer

---

## Historico de Versoes

| Versao  | Data       | Principais entregas |
|---------|------------|---------------------|
| `0.0.0` | 2026-04-17 | Scaffold Angular CLI, Bootstrap, HeaderComponent |
