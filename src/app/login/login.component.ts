import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../service/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {CommonModule} from '@angular/common';

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
    private userService: UserService
  ) { }

  loginHandling = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('', [Validators.required])
  });

  onSubmit(){
    const username:string = this.loginHandling.value.username as string;
    const password:string = this.loginHandling.value.password as string;

    this.userService.login(username, password).subscribe({
      next: authResponse => {
        this.userService.loggedin(authResponse);
        console.log("Successful : " + authResponse);
      },
      error: (err: HttpErrorResponse) => {
        console.log("Error : " + err);
      }
    })
  }
}
