import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {HomeComponent} from './pages/home/home.component';
import {FeedComponent} from './pages/home/feed/feed.component';
import {MyprofileComponent} from './pages/home/myprofile/myprofile.component';
import {AddpostComponent} from './pages/home/addpost/addpost.component';
import {homeGuard} from './home.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'home', redirectTo: '/home/feed', pathMatch: 'full'},
  { path: 'login', title:'Login | Uniboost', component: LoginComponent },
  { path: 'signup', title:'Signup | Uniboost', component: SignupComponent },
  { path: 'home', title:'Uniboost', component: HomeComponent ,
  canActivate: [homeGuard],
  children:[
    { path: 'feed', title:'Uniboost', component: FeedComponent },
    { path: 'myprofile', title:'Uniboost', component: MyprofileComponent},
    { path: 'addpost',title:'Uniboost', component: AddpostComponent}
  ]},
];
