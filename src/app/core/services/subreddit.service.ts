import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subreddit } from '../models/subreddit.model';

const MOCK_SUBREDDITS: Subreddit[] = [
  {
    name: 'angular',
    title: 'Angular — O framework web moderno',
    description: 'Comunidade oficial do Angular. Tire duvidas, compartilhe projetos e fique por dentro das novidades do framework mantido pelo Google.',
    memberCount: 245800,
    onlineCount: 1340,
    bannerColor: '#dd0031',
    rules: ['Seja respeitoso', 'Posts devem ser relacionados ao Angular', 'Sem spam ou autopromo excessiva'],
    createdAt: new Date('2016-09-14'),
  },
  {
    name: 'webdev',
    title: 'webdev — Desenvolvimento Web',
    description: 'Um lugar para desenvolvedores web discutirem tendencias, compartilharem projetos, pedirem feedback e aprenderem juntos.',
    memberCount: 890000,
    onlineCount: 4200,
    bannerColor: '#0079d3',
    rules: ['Sem clickbait', 'Credite a autoria original', 'Fique no tema de desenvolvimento web'],
    createdAt: new Date('2008-01-25'),
  },
  {
    name: 'programming',
    title: 'programming — Programacao',
    description: 'Discussoes sobre a arte e ciencia da programacao. Algoritmos, linguagens, paradigmas e boas praticas.',
    memberCount: 5200000,
    onlineCount: 8900,
    bannerColor: '#5f99cf',
    rules: ['Conteudo original ou com valor agregado', 'Sem tutoriais basicos de iniciante', 'Respeite outras linguagens'],
    createdAt: new Date('2008-01-25'),
  },
  {
    name: 'todayilearned',
    title: 'todayilearned — Aprendi Hoje',
    description: 'Voce aprendeu algo novo e interessante hoje? Compartilhe aqui! Fatos curiosos, descobertas surpreendentes e conhecimentos uteis.',
    memberCount: 38000000,
    onlineCount: 25000,
    bannerColor: '#cea227',
    rules: ['Comece com "TIL"', 'Inclua uma fonte confiavel', 'Verifique se ja foi postado'],
    createdAt: new Date('2008-06-02'),
  },
  {
    name: 'technology',
    title: 'technology — Tecnologia',
    description: 'Noticias e discussoes sobre o mundo da tecnologia: hardware, software, IA, privacidade e tendencias do setor.',
    memberCount: 14000000,
    onlineCount: 9800,
    bannerColor: '#46d160',
    rules: ['Apenas noticias de fontes confiaveis', 'Sem teorias da conspiração', 'Discuta, nao apenas poste links'],
    createdAt: new Date('2008-01-25'),
  },
];

@Injectable({ providedIn: 'root' })
export class SubredditService {
  getAll(): Observable<Subreddit[]> {
    return of(MOCK_SUBREDDITS);
  }

  getByName(name: string): Observable<Subreddit | undefined> {
    return of(MOCK_SUBREDDITS.find(s => s.name === name));
  }

  formatMemberCount(count: number): string {
    if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'k';
    return count.toString();
  }
}
