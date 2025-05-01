import {Component, OnInit} from '@angular/core';
import {PostResponseOwnerDto, UserPostResponseDto} from '../../../../service/models/post-response-owner-dto';
import {EnrolledUserComponent} from './enrolled-user/enrolled-user.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../../../service/post.service';

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

  constructor(private postService: PostService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id') as string;
    this.postService.getMyPostDetails(this.courseId).subscribe({
      next: res => {this.course = res}

    })

    console.log('Course ID from URL:', this.courseId);
  }



  onEdit() {
    if (this.editMode) {
      // Save logic here (API call or event emit)
      console.log('Saved course:', this.course);
    }
    this.editMode = !this.editMode;
  }

  onCancel() {
    this.editMode = false;
    console.log('Edit cancelled');
  }


  onDelete() {
    console.log('Delete course:', this.course.id);
  }

  onRemoveStudent(student: UserPostResponseDto) {
    this.course.enrolledStudents = this.course.enrolledStudents.filter(s => s.username !== student.username);
    this.course.enrollments--;
  }





  get previewRemainingChars(): number {
    return 255 - (this.course.previewDescription?.length || 0);
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
