import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { PostCardComponent } from '../shared/post-card/post-card.component';
import { PostService } from '../core/services/post.service';
import { SearchService } from '../core/services/search.service';
import { Post } from '../core/models/post.model';

type SortOption = 'hot' | 'new' | 'top';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, PostCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private postService = inject(PostService);
  private searchService = inject(SearchService);

  allPosts: Post[] = [];
  displayedPosts: Post[] = [];
  sortBy: SortOption = 'hot';
  searchQuery = '';

  readonly PAGE_SIZE = 4;
  private pageCount = 1;

  get hasMore(): boolean {
    return this.displayedPosts.length < this.allPosts.length;
  }

  ngOnInit(): void {
    combineLatest([
      this.postService.getPosts(),
      this.searchService.search$,
    ]).subscribe(([posts, query]) => {
      this.searchQuery = query;
      this.pageCount = 1;

      const filtered = query
        ? posts.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.subreddit.toLowerCase().includes(query) ||
            p.author.toLowerCase().includes(query)
          )
        : posts;

      this.allPosts = this.sort(filtered, this.sortBy);
      this.displayedPosts = this.allPosts.slice(0, this.PAGE_SIZE);
    });
  }

  setSort(option: SortOption): void {
    this.sortBy = option;
    this.pageCount = 1;
    this.allPosts = this.sort(this.allPosts, option);
    this.displayedPosts = this.allPosts.slice(0, this.PAGE_SIZE);
  }

  loadMore(): void {
    this.pageCount++;
    this.displayedPosts = this.allPosts.slice(0, this.pageCount * this.PAGE_SIZE);
  }

  private sort(posts: Post[], by: SortOption): Post[] {
    const copy = [...posts];
    if (by === 'top') return copy.sort((a, b) => b.score - a.score);
    if (by === 'new') return copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return copy.sort((a, b) => (b.score + b.commentCount * 2) - (a.score + a.commentCount * 2));
  }
}
