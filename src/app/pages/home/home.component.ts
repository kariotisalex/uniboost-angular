import { Component } from '@angular/core';
import {NgClass} from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {UserService} from '../../service/user.service';
import {NavBarService} from '../../service/nav-bar.service';


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

  constructor(private router: Router, private userService: UserService, public navBarService: NavBarService) {
    this.navBarService.activeButton = this.router.url;
  }

  // Update active button state on click
  setActive(button: string): void {
    this.navBarService.activeButton = button;
  }

  logout(): void {
    this.userService.logout();
  }

  navigateToFeed(): void {
    this.router.navigate(['/home/feed']);
    this.navBarService.activeButton = '/home/feed';
  }

}
