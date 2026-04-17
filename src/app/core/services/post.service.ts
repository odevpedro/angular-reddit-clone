import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Post } from '../models/post.model';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Angular 19 lançado com suporte nativo a Signals e melhorias no SSR',
    author: 'angular_fan',
    subreddit: 'angular',
    score: 4821,
    commentCount: 5,
    createdAt: new Date('2026-04-16T10:00:00'),
    content: 'O time do Angular anunciou a versao 19 com diversas melhorias significativas. O destaque é o suporte nativo a Signals, que elimina a necessidade do Zone.js para deteccao de mudancas em novos projetos. Alem disso, o SSR ganhou hydration parcial incremental, reduzindo drasticamente o LCP em aplicacoes de grande escala. A migracao de projetos existentes e totalmente incremental, sem a necessidade de reescrever o codigo de uma vez.',
    userVote: 0,
  },
  {
    id: '2',
    title: 'Qual a melhor biblioteca de gerenciamento de estado para Angular em 2026?',
    author: 'dev_curious',
    subreddit: 'webdev',
    score: 1203,
    commentCount: 3,
    createdAt: new Date('2026-04-16T14:30:00'),
    content: 'Com o Angular 19 consolidando Signals como o padrao reativo do framework, fica a duvida: ainda faz sentido usar NgRx, Akita ou outras libs de state management? Ou Signals + servicos com BehaviorSubject sao suficientes para a maioria dos casos? Qual a opniao de voces?',
    userVote: 0,
  },
  {
    id: '3',
    title: 'Criei um clone do Reddit com Angular e Bootstrap — feedback?',
    author: 'odevpedro',
    subreddit: 'webdev',
    score: 567,
    commentCount: 2,
    createdAt: new Date('2026-04-17T08:00:00'),
    content: 'Passei as ultimas semanas construindo um clone do Reddit do zero com Angular 19 standalone components e Bootstrap 5. Implementei: feed de posts com ordenacao, sistema de votos reativo, paginas de subreddit, thread de comentarios recursivos e autenticacao com formularios reativos. Todo o estado e gerenciado com BehaviorSubject em servicos. Feedbacks e muito bem-vindos!',
    userVote: 0,
  },
  {
    id: '4',
    title: 'TIL que o Bootstrap 5 removeu a dependência do jQuery completamente',
    author: 'css_nerd',
    subreddit: 'todayilearned',
    score: 9342,
    commentCount: 2,
    createdAt: new Date('2026-04-15T20:00:00'),
    content: 'Sempre assumi que Bootstrap dependia do jQuery. Hoje aprendi que desde a versao 5 (lancada em 2021) o Bootstrap e 100% JavaScript puro, sem nenhuma dependencia externa. Os componentes interativos como modals, dropdowns e tooltips funcionam com Vanilla JS. Isso reduz o bundle em ~30kb minificado.',
    userVote: 0,
  },
  {
    id: '5',
    title: 'Por que TypeScript se tornou a linguagem dominante no frontend?',
    author: 'ts_evangelist',
    subreddit: 'programming',
    score: 7810,
    commentCount: 3,
    createdAt: new Date('2026-04-14T09:00:00'),
    content: 'Em 2012, TypeScript era um experimento da Microsoft que poucos levavam a serio. Em 2026, e praticamente impossivel encontrar um projeto frontend serio que nao o utilize. O que explica essa adocao massiva? Tipo estatico, melhor DX com autocomplete e refactoring seguro, integracao profunda com editores, e o fato de frameworks como Angular ja nasceram com TS sao os principais fatores. Mas ha custos: complexidade de tipos avancados e curva de aprendizado.',
    userVote: 0,
  },
  {
    id: '6',
    title: 'Usando defer blocks do Angular 17+ para lazy load de componentes pesados',
    author: 'lazy_loader',
    subreddit: 'angular',
    score: 2134,
    commentCount: 0,
    createdAt: new Date('2026-04-13T15:00:00'),
    content: 'Os defer blocks introduzidos no Angular 17 permitem adiar o carregamento de partes do template ate que uma condicao seja satisfeita (viewport, interacao, idle). Isso e especialmente util para componentes pesados como editores de texto, graficos e mapas. Compartilho aqui um exemplo pratico de como usamos isso para reduzir o bundle inicial em 40%.',
    userVote: 0,
  },
  {
    id: '7',
    title: 'A IA vai substituir desenvolvedores front-end em 5 anos?',
    author: 'future_watcher',
    subreddit: 'technology',
    score: 15420,
    commentCount: 0,
    createdAt: new Date('2026-04-12T10:00:00'),
    content: 'Com ferramentas como GitHub Copilot, v0 e Claude Code gerando interfaces completas a partir de prompts, a pergunta deixou de ser teorica. Desenvolvedores que apenas escrevem HTML/CSS/JS parecem vulneraveis. Mas ha consenso de que profissionais que entendem de sistemas, arquitetura e qualidade ainda serao essenciais por muito tempo. O que voces acham?',
    userVote: 0,
  },
];

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts$ = new BehaviorSubject<Post[]>(MOCK_POSTS);

  getPosts(): Observable<Post[]> {
    return this.posts$.asObservable();
  }

  getById(id: string): Observable<Post | undefined> {
    return this.posts$.pipe(map(posts => posts.find(p => p.id === id)));
  }

  getBySubreddit(subreddit: string): Observable<Post[]> {
    return this.posts$.pipe(map(posts => posts.filter(p => p.subreddit === subreddit)));
  }

  vote(postId: string, direction: 1 | -1): void {
    const updated = this.posts$.getValue().map(post => {
      if (post.id !== postId) return post;
      const prev = post.userVote;
      const userVote: 1 | -1 | 0 = prev === direction ? 0 : direction;
      return { ...post, userVote, score: post.score + (userVote - prev) };
    });
    this.posts$.next(updated);
  }
}
