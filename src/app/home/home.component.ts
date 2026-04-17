import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from '../shared/post-card/post-card.component';
import { PostService } from '../core/services/post.service';
import { Post } from '../core/models/post.model';

type SortOption = 'hot' | 'new' | 'top';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  sortBy: SortOption = 'hot';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = this.sort(posts, this.sortBy);
    });
  }

  setSort(option: SortOption): void {
    this.sortBy = option;
    this.posts = this.sort(this.posts, option);
  }

  private sort(posts: Post[], by: SortOption): Post[] {
    const copy = [...posts];
    if (by === 'top') return copy.sort((a, b) => b.score - a.score);
    if (by === 'new') return copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return copy.sort((a, b) => (b.score + b.commentCount * 2) - (a.score + a.commentCount * 2));
  }
}
