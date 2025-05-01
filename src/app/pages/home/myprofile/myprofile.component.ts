import {Component, OnInit} from '@angular/core';

// import {MyCoursesComponent} from './my-courses/my-courses.component';
import {UserPostResponseDto} from '../../../service/models/user-post-response-dto';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserService} from '../../../service/user.service';
import {UserInfoRequestDto} from '../../../service/models/user-info-request-dto';
import {PostResponseDto} from '../../../service/models/post-response';
import {EnrolledCoursesComponent} from './enrolled-courses/enrolled-courses.component';
import {MyCoursesComponent} from './my-courses/my-courses.component';
import {NavBarService} from '../../../service/nav-bar.service';

@Component({
  selector: 'app-myprofile',
  standalone:true,
  imports: [
    // MyCoursesComponent,
    FormsModule,
    CommonModule,
    EnrolledCoursesComponent,
    MyCoursesComponent,
  ],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyprofileComponent implements OnInit {
  user! : UserPostResponseDto;
  editedUser = { ...this.user };
  activeTab: 'enrolled' | 'created' = 'enrolled';

  isEditMode = false;
  isEditingUsername = false;
  isEditingEmail = false;

  // enrolledCourses: PostResponseDto[] = [];
  enrolledCourses: PostResponseDto[] = [
    {
      id: '1',
      title: 'Intro to Spring Boot',
      previewDescription: 'Learn how to build secure APIs with Spring Boot and JWT.',
      maxEnrolls: 20,
      isPersonal: false,
      place: 'Online',
      userOwner: {
        username: 'jdoe',
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        phone: '1234567890'
      },
      enrollments: 15
    },
    // Add more sample courses if needed
  ];


  constructor(private userService: UserService, private navBarService: NavBarService) {
    this.navBarService.activeButton = '/home/myprofile';
  }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe({
      next: res => {this.user = res},
      error: err => {console.log(err)}
    })

    // this.loadEnrolledCourses();
  }

  // loadEnrolledCourses(): void {
  //   // Example: Fetch from backend
  //   this.courseService.getEnrolledCoursesForUser().subscribe({
  //     next: (courses) => (this.enrolledCourses = courses),
  //     error: (err) => console.error('Failed to load courses', err),
  //   });

    // OR: If static for now
    // this.enrolledCourses = [ ...some mock courses... ];
  // }





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


  protected readonly console = console;
}
