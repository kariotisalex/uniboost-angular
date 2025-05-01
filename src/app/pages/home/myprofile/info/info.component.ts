import {Component, OnInit} from '@angular/core';
import {UserPostResponseDto} from '../../../../service/models/user-post-response-dto';
import {UserService} from '../../../../service/user.service';
import {NavBarService} from '../../../../service/nav-bar.service';
import {UserInfoRequestDto} from '../../../../service/models/user-info-request-dto';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EnrolledCoursesComponent} from './enrolled-courses/enrolled-courses.component';
import {MyCoursesComponent} from './my-courses/my-courses.component';

@Component({
  selector: 'app-info',
  standalone:true,
  imports: [CommonModule, FormsModule, EnrolledCoursesComponent, MyCoursesComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit{
  user! : UserPostResponseDto;
  editedUser = { ...this.user };
  activeTab: 'enrolled' | 'created' = 'enrolled';

  isEditMode = false;
  isEditingUsername = false;
  isEditingEmail = false;

  constructor(private userService: UserService, private navBarService: NavBarService) {
    this.navBarService.activeButton = '/home/myprofile';
  }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe({
      next: res => {this.user = res},
      error: err => {console.log(err)}
    })
  }

  toggleEdit(): void {
    this.isEditMode = true;
    this.editedUser = { ...this.user };
  }
  startEditingUsername(): void {
    this.editedUser.username = this.user.username;
    this.isEditingUsername = true;
  }

  startEditingEmail(): void {
    this.editedUser.email = this.user.email;
    this.isEditingEmail = true;
  }





  cancelEdit(): void {
    this.editedUser = { ...this.user };
    this.isEditMode = false;
  }

  cancelUsernameEdit(): void {
    this.editedUser.username = this.user.username;
    this.isEditingUsername = false;
  }

  cancelEmailEdit(): void {
    this.editedUser.email = this.user.email;
    this.isEditingEmail = false;
  }

  isSaveDisabled(): boolean {
    const { firstname, lastname, phone } = this.editedUser;

    // Check for empty or whitespace-only fields
    if (!firstname?.trim() || !lastname?.trim() || !phone?.trim()) {
      return true;
    }

    // Optional: strict validation for Greek 10-digit phone numbers
    const phonePattern = /^\d{10}$/;

    return !phonePattern.test(phone);
  }



  saveChanges(): void {
    // Validate & save edited values for firstname, lastname, phone
    this.user.firstname = this.editedUser.firstname;
    this.user.lastname = this.editedUser.lastname;
    this.user.phone = this.editedUser.phone;

    this.isEditMode = false;

    const userInfo: UserInfoRequestDto = {
      firstname: this.editedUser.firstname,
      lastname: this.editedUser.lastname,
      phone: this.editedUser.phone
    }

    this.userService.updateUserInfo(userInfo).subscribe({
      next: res => {this.user = res},
      error: err => {console.log(err)}
    })
  }



  // ---- Username Editing ----
  saveUsername(): void {
    this.user.username = this.editedUser.username;
    this.isEditingUsername = false;

    this.userService.updateUserUsername(this.editedUser.username)
      .subscribe({
        next: res => {
          alert("Please Login again");
          this.userService.logout()
        },
        error: err => {console.log(err)}
      })
  }



  // ---- Email Editing ----
  saveEmail(): void {
    this.user.email = this.editedUser.email;
    this.isEditingEmail = false;

    this.userService.updateUserEmail(this.editedUser.email)
      .subscribe({
        next: res => {this.user = res},
        error: err => {console.log(err)}
      })
  }

}
