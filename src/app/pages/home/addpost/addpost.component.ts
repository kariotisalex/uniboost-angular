import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PostService} from '../../../service/post.service';

@Component({
  selector: 'app-addpost',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addpost.component.html',
  styleUrl: './addpost.component.css'
})
export class AddpostComponent {
  title: string = '';
  previewDescription: string = '';
  description: string = '';
  maxEnrolls: number | null = null;
  isPersonal: boolean = false;
  place: string = '';

  errorMessage: string = '';


  constructor(private postService: PostService) {}

  onSubmit() {
    // Reset previous error
    this.errorMessage = '';

    // Trim text fields
    this.title = this.title.trim();
    this.previewDescription = this.previewDescription.trim();
    this.description = this.description.trim();
    this.place = this.place.trim();

    const body = {
      title: this.title,
      previewDescription: this.previewDescription,
      description: this.description,
      maxEnrolls: this.maxEnrolls,
      isPersonal: this.isPersonal,
      place: this.place,
    };
    this.postService.addPost(body).subscribe({
      next: (response) => {
        console.log('Post created successfully');
        // You can reset form here if you want
      },
      error: (error) => {
        console.error('Error creating post', error);
        this.errorMessage = error.error?.message || 'Something went wrong. Please try again.';
      },
    });
  }
}
