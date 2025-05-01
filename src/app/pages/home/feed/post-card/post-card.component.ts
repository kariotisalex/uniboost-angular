import {Component, Input} from '@angular/core';
import {PostResponseDto} from '../../../../service/models/post-response';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PostService} from '../../../../service/post.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../../../../service/user.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ReactiveFormsModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  @Input() post!: PostResponseDto;


  constructor(private postService: PostService, private router: Router) {
  }

  goto(){
    this.router.navigate([`home/course/${this.post.id}`]);
  }
}
