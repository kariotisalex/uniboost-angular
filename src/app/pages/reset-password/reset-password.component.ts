import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../service/user.service';
import {CommonModule} from '@angular/common';
import {ErrorResponse} from '../../service/models/error-response';

@Component({
  selector: 'app-reset-password',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{
  resetPasswordForm: FormGroup;
  token: string = '';
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    }, {
      validators: [this.matchPasswords()]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  get passwordMismatch(): boolean {
    return (
      this.resetPasswordForm.hasError('passwordMismatch') &&
      !!this.resetPasswordForm.get('confirmPassword')?.touched
    );
  }


  matchPasswords() {
    return (group: FormGroup) => {
      const pass = group.get('password')?.value;
      const confirm = group.get('confirmPassword')?.value;
      return pass === confirm ? null : { passwordMismatch: true };
    };
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) return;

    this.loading = true;
    this.error = null;
    this.success = null;

    const password = this.resetPasswordForm.get('password')?.value;

    this.userService.resetPassword(this.token, password).subscribe({
      next: () => {
        alert ('Password reset successful. You can now log in.');
        this.loading = false;
        this.router.navigate(['/home']);
      },
      error: (err:HttpErrorResponse) => {
        const errObj = err.error as ErrorResponse;
        this.error = errObj.detail;
        this.loading = false;
      }
    });
  }
}
