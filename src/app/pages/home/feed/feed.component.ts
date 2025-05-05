import { Component, OnInit } from '@angular/core';
import { PostResponseDto } from '../../../service/models/post-response';
import { PostService } from '../../../service/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostCardComponent } from './post-card/post-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, PostCardComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {
  posts: PostResponseDto[] = [];
  searchQuery = '';
  currentPage = 1;
  totalElements = 0;
  pageSize = 10;
  maxVisiblePages = 5;

  constructor(
    private postService: PostService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  // Load posts from backend with current searchQuery and page
  loadPosts(page: number = 0): void {
    this.postService.getPostsByPage(page, this.searchQuery.trim()).subscribe({
      next: value => {
        this.posts = value.content;
        this.totalElements = value.total;
      }
    });
  }

  // Triggered by "Search" button
  onSearchClick(): void {
    this.currentPage = 1;
    this.loadPosts(0);
  }

  // Triggered by ❌ clear button
  clearSearch(): void {
    this.searchQuery = '';
    this.currentPage = 1;
    this.loadPosts(0);
  }

  // Pagination calculations
  get totalPages(): number {
    const pages = Math.ceil(this.totalElements / this.pageSize);
    return pages < 1 ? 1 : pages;
  }

  // Navigate to selected page
  goToPage(page: number): void {
    if (this.totalElements === 0) return;

    if (page >= 1 && page <= this.totalPages) {
      this.loadPosts(page - 1);
      this.currentPage = page;
    }
  }

  // Visible pagination buttons
  get visiblePages(): number[] {
    const pages: number[] = [];
    const half = Math.floor(this.maxVisiblePages / 2);

    let start = Math.max(2, this.currentPage - half);
    let end = Math.min(this.totalPages - 1, this.currentPage + half);

    if (this.currentPage <= half) {
      start = 2;
      end = this.maxVisiblePages;
    }

    if (this.currentPage >= this.totalPages - half) {
      start = this.totalPages - this.maxVisiblePages + 1;
      end = this.totalPages - 1;
    }

    for (let i = start; i <= end; i++) {
      if (i > 1 && i < this.totalPages) {
        pages.push(i);
      }
    }

    return pages;
  }
}
