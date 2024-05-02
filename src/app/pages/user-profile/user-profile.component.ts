import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserManagementService } from '../../core/services/Users/user-management.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrentUserService } from '../../core/services/Users/current-user.service';
import { returnUserData } from '../../core/models/user-details';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {

  public isUpdating = true;
  public newUserName?: string;
  public newFirstName?: string;
  public newLastName?: string;
  public newEmail?: string;
  public newPassword?: string;
  public newUserImage?: string;

  public currentUser?: returnUserData;
  public userId?: string | any;
  public updatedUserData?: returnUserData | any;

  constructor(
    private _userService: UserManagementService,
    private _currentUserService: CurrentUserService,
  ) {}

  @ViewChild('userImage') userImage!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  profileImage: string = '../../../assets/images/user.jpg';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.profileImage = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }
  // add feature to show user data on html

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
  onPasswordChange(password: string): void {
    this.newPassword = password;
  }
  onUserImageChange(userImage: string): void {
    this.newUserImage = userImage;
  }
  // change ditections end

  updateButtonClicked() {
    this.isUpdating = !this.isUpdating;
    this.updatedUserData = {
      firstName: this.newFirstName,
      lastName: this.newLastName,
      userName: this.newUserName,
      email: this.newEmail,
      password: this.newPassword,
    }

    this._userService.updateUser(this.updatedUserData, this.userId)
    .subscribe(
      (response) => {
        console.log('User data updated successfully:', response);
        // handle success, e.g., show a success message to the user
      },        
      (error) => {
        console.error('Error updating user data:', error);
        // handle error, e.g., show an error message to the user
      }
    )
  }

  // signout user 
  logoutButtonClicked(){
    this._currentUserService.logout()
  }




  ngOnInit(): void {
    this.currentUser = this._currentUserService.getCurrentUser();
    console.log(this.currentUser?.id);
    this.userId = this.currentUser?.id;
  }

}
