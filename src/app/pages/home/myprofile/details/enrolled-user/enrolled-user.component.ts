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
    const confirmDelete = window.confirm('Are you sure you want to delete this user from your course?');

    if (!confirmDelete) return;
    this.remove.emit(student);
  }
}
