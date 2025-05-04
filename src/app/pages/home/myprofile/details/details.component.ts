import {Component, OnInit} from '@angular/core';
import {PostResponseOwnerDto, UserPostResponseDto} from '../../../../service/models/post-response-owner-dto';
import {EnrolledUserComponent} from './enrolled-user/enrolled-user.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../../service/post.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorResponse} from '../../../../service/models/error-response';

@Component({
  selector: 'app-details',
  standalone:true,
  imports: [
    EnrolledUserComponent, CommonModule, FormsModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{

  courseId!: string;
  editMode = false;
  course!: PostResponseOwnerDto;
  originalCourse!: PostResponseOwnerDto;

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private router: Router) {}

  init() {
    this.postService.getMyPostDetails(this.courseId).subscribe({
      next: res => {
        this.course = res;
        this.originalCourse = structuredClone(res); // Deep copy for change detection
      }
    })
  }
  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id') as string;
    this.init();
    console.log('Course ID from URL:', this.courseId);
  }



  onEdit() {
    if (this.editMode) {
      this.postService.updatePost(this.course).subscribe({
        next: value => {
          this.course = value;
          this.originalCourse = structuredClone(this.course);
        },
        error: (err: HttpErrorResponse) => {
          const errObj: ErrorResponse = err.error as ErrorResponse;
          console.log(errObj.detail);
        }
      });
    }
    this.editMode = !this.editMode;
  }


  onCancel() {
    this.editMode = false;
    this.course = this.originalCourse;
  }


  onDelete() {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');

    if (!confirmDelete) return;

    this.postService.delete(this.courseId).subscribe({
      next: () => {
        this.router.navigateByUrl('/home/myprofile/info');
      },
      error: (err: HttpErrorResponse) => {
        const errObj: ErrorResponse = err.error as ErrorResponse;
        console.log(errObj.detail);
      }
    });
  }


  onRemoveStudent(student: UserPostResponseDto) {
    this.postService.removeStudent(student.id,this.courseId).subscribe({
      next: res => {
        this.init();
      }
    })
  }





  get previewRemainingChars(): number {
    return 255 - (this.course.previewDescription?.length || 0);
  }
  get isCourseUnchanged(): boolean {
    return JSON.stringify(this.course) === JSON.stringify(this.originalCourse);
  }

  getProgressBarClass(): string {
    const percent = this.course.enrollments / this.course.maxEnrolls;

    if (percent === 1) {
      return 'bg-gradient-to-r from-red-400 to-red-600';
    } else if (percent >= 0.8) {
      return 'bg-gradient-to-r from-yellow-300 to-yellow-500';
    } else {
      return 'bg-gradient-to-r from-green-300 to-green-500';
    }
  }

}
