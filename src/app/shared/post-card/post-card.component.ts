import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Post } from '../../core/models/post.model';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;

  constructor(private postService: PostService) {}

  vote(event: MouseEvent, direction: 1 | -1): void {
    event.stopPropagation();
    this.postService.vote(this.post.id, direction);
  }

  formatScore(score: number): string {
    if (score >= 1000) return (score / 1000).toFixed(1) + 'k';
    return score.toString();
  }

  timeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s atrás`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m atrás`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h atrás`;
    return `${Math.floor(hours / 24)}d atrás`;
  }
}
