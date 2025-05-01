import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { UserService } from '../../service/user.service';
import { ErrorResponse } from '../../service/models/error-response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  error: string = "";

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  signupHandling = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  onSubmit() {
    const username: string = this.signupHandling.value.username as string;
    const password: string = this.signupHandling.value.password as string;
    const firstName: string = this.signupHandling.value.firstName as string;
    const lastName: string = this.signupHandling.value.lastName as string;
    const email: string = this.signupHandling.value.email as string;
    const phone: string = this.signupHandling.value.phone as string;

    this.error = ""; // Clear previous error

    this.userService.register(username, password, firstName, lastName, email, phone)
      .subscribe({
        next: authResponse => {
          this.userService.loggedin(authResponse);
          this.router.navigate(['/home/feed']);
        },
        error: (err: HttpErrorResponse) => {
          const errObject: ErrorResponse = err.error;
          this.error = errObject.detail;
        }
      });
  }
}
