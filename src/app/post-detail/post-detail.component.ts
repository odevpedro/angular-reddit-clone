import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { combineLatest, switchMap } from 'rxjs';
import { CommentComponent } from '../shared/comment/comment.component';
import { PostService } from '../core/services/post.service';
import { CommentService } from '../core/services/comment.service';
import { AuthService } from '../core/services/auth.service';
import { Post } from '../core/models/post.model';
import { Comment } from '../core/models/comment.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CommentComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  comments: Comment[] = [];
  notFound = false;

  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private commentService = inject(CommentService);
  private authService = inject(AuthService);

  commentControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  currentUser$ = this.authService.user$;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id') ?? '';
        return combineLatest([
          this.postService.getById(id),
          this.commentService.getByPost(id),
        ]);
      })
    ).subscribe(([post, comments]) => {
      this.post = post;
      this.comments = comments;
      this.notFound = !post;
    });
  }

  vote(direction: 1 | -1): void {
    if (this.post) this.postService.vote(this.post.id, direction);
  }

  submitComment(): void {
    const user = this.authService.currentUser;
    if (!user || !this.commentControl.valid || !this.post) return;
    this.commentService.addComment(this.post.id, null, this.commentControl.value!, user.username);
    this.commentControl.reset();
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
