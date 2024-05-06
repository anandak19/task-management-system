import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  passwordChange,
  returnUserData,
  updateUser,
} from '../../core/models/user-details';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsersManagementService } from '../../shared/services/user/users-management.service';
import { CurrentUserManagementService } from '../../shared/services/user/current-user-management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  // declations
  public isUpdating?: boolean;
  public newUserName?: string;
  public newFirstName?: string;
  public newLastName?: string;
  public newEmail?: string;
  public newPassword?: string;
  public newImage?: string;

  public currentUser?: returnUserData;
  public userId?: string | any;
  public updatedUserData?: updateUser | any;
  faBack = faArrowLeft;

  @ViewChild('userImage') userImage!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private _userService: UsersManagementService,
    private _currentUserService: CurrentUserManagementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setCurrentUser();
    this.isUpdating = false;
  }

  // save the current user details
  setCurrentUser() {
    this.currentUser = { ...this._currentUserService.getCurrentUser() };
    this.newPassword = this.currentUser?.password;
    this.newUserName = this.currentUser?.userName;
    this.newFirstName = this.currentUser?.firstName;
    this.newLastName = this.currentUser?.lastName;
    this.newEmail = this.currentUser?.email;
    this.newImage = this.currentUser?.userImage;
    this.userId = this.currentUser?.id;
  }

  // to save and show the profile image
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.newImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  //navigate back
  goBackClicked() {
    if (this.isUpdating) {
      Swal.fire({
        title: 'Unsaved Changes',
        text: 'Changes are not saved',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1800,
      });
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  // change ditections start
  onUsernameChange(username: string): void {
    this.newUserName = username;
  }
  onFirstNameChange(firstName: string): void {
    this.newFirstName = firstName;
  }
  onLastNameChange(lastName: string): void {
    this.newLastName = lastName;
  }
  onEmailChange(email: string): void {
    this.newEmail = email;
  }
  // change ditections end

  // to update the profile data
  updateButtonClicked() {
    if (this.isUpdating) {
      this.isUpdating = !this.isUpdating;
      this.updatedUserData = {
        firstName: this.newFirstName,
        lastName: this.newLastName,
        userName: this.newUserName,
        email: this.newEmail,
        userImage: this.newImage,
        id: this.userId,
      };
      this._currentUserService.setCurrentUser(this.updatedUserData);
      this._userService.updateUser(this.updatedUserData, this.userId).subscribe(
        (response) => {
          Swal.fire({
            title: 'Success',
            text: 'User data updated successfully',
            icon: 'success',
            confirmButtonColor: '#3d5653',
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Failed to update user data',
            icon: 'error',
            confirmButtonColor: '#3d5653',
          });
        }
      );
    } else {
      this.isUpdating = !this.isUpdating;
    }
  }

  // to update the password
  async updatePasswordClicked() {
    const { value: oldPassword } = await Swal.fire({
      title: 'Enter current password',
      input: 'password',
      inputPlaceholder: 'Enter your password',
      confirmButtonColor: '#3d5653',
      inputAttributes: {
        maxlength: '10',
        autocapitalize: 'off',
        autocorrect: 'off',
      },
    });

    if (oldPassword === this.currentUser?.password) {
      const { value: newPassword } = await Swal.fire({
        title: 'Enter new password',
        input: 'password',
        inputPlaceholder: 'Enter new password',
        inputAttributes: {
          maxlength: '10',
          autocapitalize: 'off',
          autocorrect: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Change Password',
        confirmButtonColor: '#3d5653',
      });

      if (newPassword) {
        const password: passwordChange = {
          password: newPassword,
        };
        this._userService.updateUserPassword(password, this.userId).subscribe(
          (response) => {
            Swal.fire({
              title: 'Success',
              text: 'Password updated successfully',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to update password',
              icon: 'error',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      } else {
        Swal.fire({
          title: 'Cancelled',
          text: 'Password change cancelled',
          icon: 'info',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        title: 'Wrong Password',
        text: 'Entered password is wrong. Please try again',
        icon: 'error',
        confirmButtonColor: '#3d5653',
      });
    }
  }

  // signout user
  logoutButtonClicked() {
    this._currentUserService.logout();
  }
}
