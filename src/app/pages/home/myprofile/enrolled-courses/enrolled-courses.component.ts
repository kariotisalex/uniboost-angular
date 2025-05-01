import {Component, Input, OnInit} from '@angular/core';
import {PostResponseContainerDto, PostResponseDto} from '../../../../service/models/post-response';
import {CommonModule} from '@angular/common';
import {PostService} from '../../../../service/post.service';
import {Router} from '@angular/router';
import {NavBarService} from '../../../../service/nav-bar.service';

@Component({
  selector: 'app-enrolled-courses',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './enrolled-courses.component.html',
  styleUrl: './enrolled-courses.component.css'
})
export class EnrolledCoursesComponent implements OnInit {
  posts: PostResponseDto[] = [];
  totalElements: number = 0;

  pageSize: number = 6;
  currentPage: number = 1;
  maxVisiblePages: number = 5;

  constructor(private postService: PostService, private router: Router, private navBarService: NavBarService) {}

  ngOnInit(): void {
    this.fetchPosts(this.currentPage);
  }

  fetchPosts(page: number): void {
    this.postService.getEnrolledCourses(page-1, this.pageSize).subscribe((res: PostResponseContainerDto) => {
      this.posts = res.content;
      this.totalElements = res.total;
      this.currentPage = page;
    });
  }

  pageHandler(page: number): void {
    if (page === this.currentPage) return;
    this.fetchPosts(page);
  }

  get displayedPages(): (number | string)[] {
    const totalPages = Math.ceil(this.totalElements / this.pageSize);
    const pages: (number | string)[] = [];

    if (totalPages <= this.maxVisiblePages + 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(this.maxVisiblePages / 2);
      let start = this.currentPage - half;
      let end = this.currentPage + half;

      if (start <= 2) {
        start = 2;
        end = start + this.maxVisiblePages - 1;
      }

      if (end >= totalPages - 1) {
        end = totalPages - 1;
        start = end - this.maxVisiblePages + 1;
      }

      pages.push(1);
      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  }

  onPostClick(postId: string): void {
    this.navBarService.activeButton = '/home/feed';
    this.router.navigate([`home/course/${postId}`]);

  }
}
