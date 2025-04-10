import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', title:'Login | Uniboost', component: LoginComponent },
  { path: 'signup', title:'Signup | Uniboost', component: SignupComponent },
];
