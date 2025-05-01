import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostDetailsResponseDto} from '../../../../service/models/post-details-response-dto';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../../../service/post.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {


  constructor(private route: ActivatedRoute,
              private postService: PostService) {
  }

  ngOnInit(): void {
      this.getPost()
  }

  getPost() {
    this.route.paramMap
      .subscribe({
        next: res => {
          const pid = res.get('id');
          if (pid) {
            this.postService.getPostDetails(pid)
              .subscribe({
                next: res => {
                  this.course = res;
                },error: (err : HttpErrorResponse) =>{
                  console.log(err.error);
                }
              });
          }
        }
      });

  }

  course!: PostDetailsResponseDto ;

  getProgressColor(): string {
    const percentage = (this.course.enrollments / this.course.maxEnrolls) * 100;

    if (percentage < 70) {
      return 'bg-green-500';
    } else if (percentage >= 70 && percentage < 99) {
      return 'bg-yellow-500';
    } else {
      return 'bg-red-500';
    }
  }

  enroll() {
    this.postService.enroll(this.course.id)
      .subscribe({
        next: res => this.course = res,
        error: (err : HttpErrorResponse) =>{console.log(err.error?.detail)}
      })
  }

  disenroll() {
    this.postService.disenroll(this.course.id)
      .subscribe({
        next: value => this.course = value,
        error: (err : HttpErrorResponse) =>{console.log(err.error?.detail)}})

  }

}
