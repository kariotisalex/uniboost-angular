import { Component } from '@angular/core';
import {NgClass} from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {UserService} from '../../service/user.service';


@Component({
  selector: 'app-home',
  standalone:true,
  imports: [
    NgClass,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Set a default active button (e.g., 'home')
  activeButton: string = 'home';

  constructor(private router: Router, private userService: UserService) {
    this.activeButton = this.router.url;
  }

  // Update active button state on click
  setActive(button: string): void {
    this.activeButton = button;
  }
  logout(): void {
    this.userService.logout();
  }

}
