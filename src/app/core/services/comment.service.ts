import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

const MOCK_COMMENTS: Comment[] = [
  // Post 1 comments
  {
    id: 'c1', postId: '1', parentId: null,
    author: 'signals_lover', body: 'Finalmente! Signals mudaram completamente como penso reatividade no Angular. Muito mais previsivel que o combo Zone.js + ChangeDetection.',
    score: 342, createdAt: new Date('2026-04-16T11:00:00'), userVote: 0, replies: [],
  },
  {
    id: 'c2', postId: '1', parentId: 'c1',
    author: 'zonejs_defender', body: 'Concordo que é mais previsivel, mas Zone.js ainda tem seu lugar em projetos legados grandes. Migrar tudo de uma vez é inviavel.',
    score: 127, createdAt: new Date('2026-04-16T11:30:00'), userVote: 0, replies: [],
  },
  {
    id: 'c3', postId: '1', parentId: 'c2',
    author: 'pragmatic_dev', body: 'Exato. A estrategia de migracao incremental que o time do Angular propoe é o caminho certo. Sem big bang rewrite.',
    score: 89, createdAt: new Date('2026-04-16T12:00:00'), userVote: 0, replies: [],
  },
  {
    id: 'c4', postId: '1', parentId: null,
    author: 'ssr_enjoyer', body: 'As melhorias no SSR com hydration parcial sao o que eu mais esperava. Nosso LCP caiu 40% nos testes iniciais.',
    score: 215, createdAt: new Date('2026-04-16T12:30:00'), userVote: 0, replies: [],
  },
  {
    id: 'c5', postId: '1', parentId: 'c4',
    author: 'performance_nerd', body: 'Que metrica incrivel! Como voce mediu? Usando Lighthouse CI no pipeline?',
    score: 67, createdAt: new Date('2026-04-16T13:00:00'), userVote: 0, replies: [],
  },
  // Post 2 comments
  {
    id: 'c6', postId: '2', parentId: null,
    author: 'ngrx_fan', body: 'NgRx continua sendo o padrao para projetos enterprise. A integracao com DevTools é imbativel para debug.',
    score: 198, createdAt: new Date('2026-04-16T15:00:00'), userVote: 0, replies: [],
  },
  {
    id: 'c7', postId: '2', parentId: 'c6',
    author: 'signals_only', body: 'Para projetos novos, Signals nativos + servicos sao suficientes em 90% dos casos. NgRx adiciona complexidade desnecessaria.',
    score: 245, createdAt: new Date('2026-04-16T15:30:00'), userVote: 0, replies: [],
  },
  {
    id: 'c8', postId: '2', parentId: null,
    author: 'akita_user', body: 'Akita State Management ainda nao tem o reconhecimento que merece. API muito mais ergonomica que NgRx.',
    score: 76, createdAt: new Date('2026-04-16T16:00:00'), userVote: 0, replies: [],
  },
  // Post 3 comments
  {
    id: 'c9', postId: '3', parentId: null,
    author: 'code_reviewer', body: 'Ficou muito bom! O sistema de votos funcionando em tempo real é o destaque. Vou dar uma olhada no codigo.',
    score: 54, createdAt: new Date('2026-04-17T09:00:00'), userVote: 0, replies: [],
  },
  {
    id: 'c10', postId: '3', parentId: 'c9',
    author: 'odevpedro', body: 'Obrigado! O codigo esta no GitHub. Qualquer feedback e bem-vindo.',
    score: 23, createdAt: new Date('2026-04-17T09:30:00'), userVote: 0, replies: [],
  },
  // Post 4 comments
  {
    id: 'c11', postId: '4', parentId: null,
    author: 'jquery_veteran', body: 'Usei jQuery por 10 anos. A transicao para Vanilla JS e frameworks modernos foi dolorosa mas valeu cada segundo.',
    score: 892, createdAt: new Date('2026-04-15T21:00:00'), userVote: 0, replies: [],
  },
  {
    id: 'c12', postId: '4', parentId: 'c11',
    author: 'web_historian', body: 'jQuery foi revolucionario para seu tempo. Normalizou APIs de DOM entre browsers numa epoca em que isso era um pesadelo.',
    score: 567, createdAt: new Date('2026-04-15T21:30:00'), userVote: 0, replies: [],
  },
  // Post 5 comments
  {
    id: 'c13', postId: '5', parentId: null,
    author: 'ts_skeptic', body: 'TypeScript e otimo, mas a complexidade de tipos avancados pode virar um pesadelo de manutencao. Tem que saber onde parar.',
    score: 1203, createdAt: new Date('2026-04-14T10:00:00'), userVote: 0, replies: [],
  },
  {
    id: 'c14', postId: '5', parentId: 'c13',
    author: 'type_guru', body: 'Concordo parcialmente. Types complexos sao sinal de design ruim. Se precisa de 5 generics encadeados, repensa a arquitetura.',
    score: 987, createdAt: new Date('2026-04-14T10:30:00'), userVote: 0, replies: [],
  },
  {
    id: 'c15', postId: '5', parentId: null,
    author: 'dx_matters', body: 'O autocomplete e refactor safe que o TS oferece valem sozinhos a adocao. Produtividade de equipe aumenta muito.',
    score: 654, createdAt: new Date('2026-04-14T11:00:00'), userVote: 0, replies: [],
  },
];

@Injectable({ providedIn: 'root' })
export class CommentService {
  private comments$ = new BehaviorSubject<Comment[]>(MOCK_COMMENTS);

  getByPost(postId: string): Observable<Comment[]> {
    return this.comments$.pipe(
      map(all => this.buildTree(all.filter(c => c.postId === postId), null))
    );
  }

  addComment(postId: string, parentId: string | null, body: string, author: string): void {
    const comment: Comment = {
      id: crypto.randomUUID(),
      postId,
      parentId,
      author,
      body,
      score: 1,
      createdAt: new Date(),
      userVote: 1,
      replies: [],
    };
    this.comments$.next([...this.comments$.getValue(), comment]);
  }

  vote(commentId: string, direction: 1 | -1): void {
    const updated = this.comments$.getValue().map(c => {
      if (c.id !== commentId) return c;
      const prev = c.userVote;
      const userVote: 1 | -1 | 0 = prev === direction ? 0 : direction;
      return { ...c, userVote, score: c.score + (userVote - prev) };
    });
    this.comments$.next(updated);
  }

  private buildTree(flat: Comment[], parentId: string | null): Comment[] {
    return flat
      .filter(c => c.parentId === parentId)
      .map(c => ({ ...c, replies: this.buildTree(flat, c.id) }));
  }
}
