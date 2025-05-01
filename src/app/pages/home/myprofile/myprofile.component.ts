import {Component} from '@angular/core';
import {InfoComponent} from './info/info.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-myprofile',
  standalone:true,
  imports: [
    InfoComponent,
    RouterOutlet
  ],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyprofileComponent  {



}
