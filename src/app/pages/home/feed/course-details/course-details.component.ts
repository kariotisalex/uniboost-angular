import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostDetailsResponseDto} from '../../../../service/models/post-details-response-dto';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
  course: PostDetailsResponseDto = {
    "id": "31d914b3-a49a-417f-96a0-69713b4552ba",
    "title": "HIIT Blast",
    "previewDescription": "High-intensity training.",
    "maxEnrolls": 25,
    "isPersonal": false,
    "place": "Outdoor Park",
    "userOwner": null,
    "enrollments": 24,
    "owner": true,
    "description": "Push your limits with this fast-paced HIIT session designed to burn calories and build endurance.",
    "enrolled": false
  };

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
    console.log('Enroll clicked');
    this.course.enrolled = true;
  }

  disenroll() {
    console.log('Disenroll clicked');
    this.course.enrolled = false;
  }

}
