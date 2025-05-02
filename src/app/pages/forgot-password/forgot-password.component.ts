import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-forgot-password',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  error: string | null = null;
  success: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.forgotPasswordForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get username() {
    return this.forgotPasswordForm.get('username');
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) return;

    this.error = null;
    this.success = null;
    this.loading = true;

    const username = this.username?.value;

    this.userService.sendResetLink(username).subscribe({
      next: () => {
        this.success = 'Reset instructions have been sent to your email.';
        this.error = null;
        this.forgotPasswordForm.reset();
        this.loading = false;
      },
      error: (err:HttpErrorResponse) => {
        this.error = err?.error?.message || 'Something went wrong.';
        this.success = null;
        this.loading = false;
      }
    });
  }
}

