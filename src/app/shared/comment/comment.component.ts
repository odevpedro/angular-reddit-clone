import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Comment } from '../../core/models/comment.model';
import { CommentService } from '../../core/services/comment.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CommentComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  @Input({ required: true }) comment!: Comment;
  @Input({ required: true }) postId!: string;

  private commentService = inject(CommentService);
  private authService = inject(AuthService);

  replyOpen = false;
  replyControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  currentUser$ = this.authService.user$;

  vote(direction: 1 | -1): void {
    this.commentService.vote(this.comment.id, direction);
  }

  submitReply(): void {
    const user = this.authService.currentUser;
    if (!user || !this.replyControl.valid) return;
    this.commentService.addComment(this.postId, this.comment.id, this.replyControl.value!, user.username);
    this.replyControl.reset();
    this.replyOpen = false;
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
