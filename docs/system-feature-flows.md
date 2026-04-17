# System Feature Flows

> Registro historico e incremental dos fluxos internos de cada funcionalidade.
> Este documento cresce a cada nova feature implementada e nunca tem secoes removidas.

---

## Indice

- [Visao Geral da Arquitetura](#visao-geral-da-arquitetura)
- [Convencoes deste Documento](#convencoes-deste-documento)
- [Feature: Scaffold Inicial e Bootstrap](#feature-scaffold-inicial-e-bootstrap)
- [Feature: HeaderComponent](#feature-headercomponent)

---

## Visao Geral da Arquitetura

Padrao arquitetural: **Standalone Components com Feature Directories**.

Cada feature e um diretorio autonomo com seus proprios componentes standalone, servicos e rotas. O roteamento raiz (`app.routes.ts`) carrega cada feature de forma lazy via `loadComponent` ou `loadChildren`.

**Fluxo global de navegacao:**

```
Browser URL
    └── Angular Router (app.routes.ts)
            └── Lazy-loaded Feature Component
                    └── Feature Service (dados / estado)
                            └── Mock Data / HTTP Client (futuro)
```

**Camadas e responsabilidades:**

| Camada         | Responsabilidade                                                        |
|----------------|-------------------------------------------------------------------------|
| `app/`         | Bootstrap, rota raiz, layout global (header + router-outlet)            |
| `core/`        | Servicos singleton, guards, interceptors, modelos de dominio            |
| `shared/`      | Componentes, pipes e diretivas reutilizaveis entre features             |
| `feature/`     | Componentes de pagina, servico proprio, rotas e estado local da feature |

---

## Convencoes deste Documento

- Componentes sao standalone (sem NgModule)
- Servicos sao `providedIn: 'root'` salvo indicacao contraria
- Estado local de componente usa Signals; estado compartilhado usa BehaviorSubject em servicos
- Rotas sao lazy — nenhum componente de feature e importado diretamente em `app.config.ts`

---

# Feature: Scaffold Inicial e Bootstrap

> **Versao:** 0.0.0
> **Implementada em:** 2026-04-17
> **Status:** Concluida

---

## Resumo

Criacao do projeto base com Angular CLI 19.2.6 e configuracao do Bootstrap 5.3 como framework de estilos. Estabelece a estrutura de diretorios e os arquivos de configuracao que todas as features subsequentes utilizam.

**Motivacao:** Ponto de partida do projeto — sem esse scaffold nenhuma outra feature pode ser desenvolvida.
**Resultado:** Aplicacao Angular funcional servida em `http://localhost:4200`, com Bootstrap disponivel globalmente via `styles.css`.

---

## Fluxo Principal

### 1. Ponto de Entrada

- **Tipo:** Inicializacao da aplicacao no browser
- **Arquivo:** `src/main.ts`
- **Metodo:** `bootstrapApplication(AppComponent, appConfig)`
- **Autenticacao:** Publica

`main.ts` chama `bootstrapApplication` passando `AppComponent` como componente raiz e `appConfig` (definido em `app.config.ts`) como configuracao. O Angular registra o router e renderiza `AppComponent` no `<app-root>` do `index.html`.

---

### 2. Configuracao da Aplicacao

- **Arquivo:** `src/app/app.config.ts`

| Provider | Finalidade |
|----------|------------|
| `provideRouter(routes)` | Registra as rotas definidas em `app.routes.ts` |
| `provideZoneChangeDetection` | Configura deteccao de mudancas com zone.js |

---

### 3. Estilos Globais

- **Arquivo:** `src/styles.css`

Bootstrap 5.3 e importado via `@import` do pacote `bootstrap/dist/css/bootstrap.min.css` instalado em `node_modules`. Isso disponibiliza todas as classes utilitarias e componentes Bootstrap globalmente sem necessidade de importacao por componente.

---

### 4. Roteamento

- **Arquivo:** `src/app/app.routes.ts`

Array de rotas atualmente vazio. Cada nova feature devera adicionar uma entrada com `loadComponent` ou `loadChildren` para manter o lazy loading.

---

## Decisoes Tecnicas

### ADR-001 — Standalone Components sem NgModule

| Campo | Detalhe |
|-------|---------|
| **Status** | Aceita |
| **Data** | 2026-04-17 |
| **Contexto** | Angular 19 recomenda o uso de standalone components como padrao, eliminando NgModules para reducao de boilerplate |
| **Decisao** | Todos os componentes do projeto sao standalone; `bootstrapApplication` e usado no lugar de `AppModule` |
| **Consequencias** | Menor boilerplate, lazy loading mais simples com `loadComponent`; porem providers precisam ser declarados explicitamente em `app.config.ts` |

---

---

# Feature: HeaderComponent

> **Versao:** 0.0.0
> **Implementada em:** 2026-04-17
> **Status:** Em andamento (template placeholder — ainda sem UI real)

---

## Resumo

Criacao do componente de cabecalho global da aplicacao via Angular CLI. O componente existe mas seu template ainda contem apenas o texto de placeholder gerado automaticamente ("header works!"). A integracao com `AppComponent` e o layout Bootstrap ainda nao foram implementados.

**Motivacao:** O header e um elemento compartilhado presente em todas as paginas — deve ser criado cedo para compor o layout base.
**Resultado:** Arquivo de componente criado e pronto para receber a implementacao da navbar.

---

## Fluxo Principal

### 1. Ponto de Entrada

- **Tipo:** Renderizacao de componente filho
- **Arquivo:** `src/app/header/header.component.ts`
- **Seletor:** `<app-header>`
- **Autenticacao:** Publica

`HeaderComponent` e um componente standalone sem inputs ou outputs definidos no momento. Para ser exibido, deve ser importado em `AppComponent` e inserido no template acima do `<router-outlet>`.

---

### 2. Estado Atual dos Arquivos

| Arquivo | Estado |
|---------|--------|
| `header.component.ts` | Componente standalone vazio (sem imports, sem logica) |
| `header.component.html` | Placeholder: `<p>header works!</p>` |
| `header.component.css` | Vazio |

---

### 3. Implementacao Pendente

1. Adicionar `HeaderComponent` ao array `imports` de `AppComponent`
2. Inserir `<app-header>` no topo do template de `AppComponent`
3. Substituir o template placeholder por navbar Bootstrap com logo, barra de busca e links de login
4. Conectar ao `AuthService` (futuro) para exibir nome do usuario logado ou botoes de login/cadastro

---

## Fluxos Alternativos e Erros

Nao aplicavel na fase atual (componente sem logica).

---

## Decisoes Tecnicas

### ADR-002 — Header como Componente Global em AppComponent

| Campo | Detalhe |
|-------|---------|
| **Status** | Aceita |
| **Data** | 2026-04-17 |
| **Contexto** | O header aparece em todas as paginas, inclusive paginas de erro e de auth |
| **Decisao** | `HeaderComponent` e renderizado diretamente em `AppComponent`, fora do `<router-outlet>`, garantindo persistencia entre navegacoes |
| **Consequencias** | O header nao precisa ser redeclarado em nenhuma feature; porem features que nao devem exibir o header (ex.: pagina de login em fullscreen) precisarao de logica adicional para ocultá-lo |
