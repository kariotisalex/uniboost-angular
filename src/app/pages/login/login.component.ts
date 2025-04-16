import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {ErrorResponse} from '../../service/Entity/error-response';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  error : string = "";

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  loginHandling = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required]),
  });

  onSubmit(){
    const username:string = this.loginHandling.value.username as string;
    const password:string = this.loginHandling.value.password as string;

    this.userService.login(username, password).subscribe({
      next: authResponse => {
        this.userService.loggedin(authResponse);
        this.router.navigate(['/home/feed']);

      },
      error: (err: HttpErrorResponse) => {
        const errObject: ErrorResponse = err.error ;
        this.error = errObject.detail;
        console.log("Error : " + errObject.detail );
      }
    })
  }
}
