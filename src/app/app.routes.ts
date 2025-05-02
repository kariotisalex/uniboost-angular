import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {HomeComponent} from './pages/home/home.component';
import {FeedComponent} from './pages/home/feed/feed.component';
import {MyprofileComponent} from './pages/home/myprofile/myprofile.component';
import {AddpostComponent} from './pages/home/addpost/addpost.component';
import {homeGuard} from './home.guard';
import {CourseDetailsComponent} from './pages/home/feed/course-details/course-details.component';
import {InfoComponent} from './pages/home/myprofile/info/info.component';
import {DetailsComponent} from './pages/home/myprofile/details/details.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'home', redirectTo: 'home/feed', pathMatch: 'full'},
  { path: 'home/myprofile', redirectTo: 'home/myprofile/info', pathMatch: 'full'},
  { path: 'login', title:'Login | Uniboost', component: LoginComponent },
  { path: 'signup', title:'Signup | Uniboost', component: SignupComponent },
  { path: 'forgot-password', title: "Forgot Password | Uniboost", component: ForgotPasswordComponent },
  { path: 'reset-password/:token', title: "Reset Password | Uniboost", component: ResetPasswordComponent },
  { path: 'home', title:'Uniboost', component: HomeComponent ,
  canActivate: [homeGuard],
  children:[
    { path: 'feed', title:'Uniboost', component: FeedComponent },
    { path: 'myprofile', title:'Uniboost', component: MyprofileComponent,
    children:[
      { path: 'info', title: 'Uniboost', component: InfoComponent },
      { path: 'details/:id', title: 'Uniboost', component: DetailsComponent }]},
    { path: 'addpost',title:'Uniboost', component: AddpostComponent},
    { path: 'course/:id', title:"Uniboost", component: CourseDetailsComponent}
  ]},
];
