import {Component, Input} from '@angular/core';
import {PostResponseDto} from '../../../../service/models/post-response';

@Component({
  selector: 'app-my-courses',
  standalone:true,
  imports: [],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent {
  @Input() courses: PostResponseDto[] = [];



}
