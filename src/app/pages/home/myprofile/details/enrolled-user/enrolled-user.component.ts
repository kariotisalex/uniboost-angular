import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserPostResponseDto} from '../../../../../service/models/post-response-owner-dto';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-enrolled-user',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './enrolled-user.component.html',
  styleUrl: './enrolled-user.component.css'
})
export class EnrolledUserComponent {
  @Input() students: UserPostResponseDto[] = [];
  @Output() remove = new EventEmitter<UserPostResponseDto>();

  removeStudent(student: UserPostResponseDto) {
    this.remove.emit(student);
  }
}
