import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';
import { PostCardComponent } from '../shared/post-card/post-card.component';
import { SubredditService } from '../core/services/subreddit.service';
import { PostService } from '../core/services/post.service';
import { Subreddit } from '../core/models/subreddit.model';
import { Post } from '../core/models/post.model';

@Component({
  selector: 'app-subreddit',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  templateUrl: './subreddit.component.html',
  styleUrl: './subreddit.component.css',
})
export class SubredditComponent implements OnInit {
  subreddit: Subreddit | undefined;
  posts: Post[] = [];
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private subredditService: SubredditService,
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const name = params.get('subreddit') ?? '';
        return combineLatest([
          this.subredditService.getByName(name),
          this.postService.getBySubreddit(name),
        ]);
      }),
      map(([subreddit, posts]) => ({ subreddit, posts }))
    ).subscribe(({ subreddit, posts }) => {
      this.subreddit = subreddit;
      this.posts = posts;
      this.notFound = !subreddit;
    });
  }

  formatCount(n: number): string {
    return this.subredditService.formatMemberCount(n);
  }
}
