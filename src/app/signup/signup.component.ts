import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorResponse} from '../service/Entity/error-response';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  error : string = "";

  constructor(
    private userService: UserService
  ) { }


  signupHandling = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required]),
    firstName : new FormControl('',[Validators.required]),
    lastName : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required]),
    phone : new FormControl('',[Validators.required]),
  });


  onSubmit(){

    const username:string = this.signupHandling.value.username as string;
    const password:string = this.signupHandling.value.password as string;
    const firstName:string = this.signupHandling.value.firstName as string;
    const lastName:string = this.signupHandling.value.lastName as string;
    const email:string = this.signupHandling.value.email as string;
    const phone:string = this.signupHandling.value.phone as string;
    this.userService.register(username, password, firstName, lastName, email, phone)
      .subscribe({next: authResponse => {
          this.userService.loggedin(authResponse);
        },
      error: (err: HttpErrorResponse) => {
        const errObject: ErrorResponse = err.error ;
    }})
  }
}
