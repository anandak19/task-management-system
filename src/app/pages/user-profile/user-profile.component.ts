import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { returnUserData } from '../../core/models/user-details';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsersManagementService } from '../../shared/services/user/users-management.service';
import { CurrentUserManagementService } from '../../shared/services/user/current-user-management.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {

  public isUpdating? : boolean;
  public newUserName?: string;
  public newFirstName?: string;
  public newLastName?: string;
  public newEmail?: string;
  public newPassword?: string;
  public newImage?: string;

  public currentUser?: returnUserData;
  public userId?: string | any;
  public updatedUserData?: returnUserData | any;
  faBack = faArrowLeft;

  @ViewChild('userImage') userImage!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private _userService: UsersManagementService,
    private _currentUserService: CurrentUserManagementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this._currentUserService.getCurrentUser();
    this.isUpdating = false;
    this.userId = this.currentUser?.id;
    this.newImage = this.currentUser?.userImage;
  }

  ngOnDestroy(): void {
    this.currentUser = undefined;
    this.newImage = undefined;
    this.isUpdating = false;
    this.userId = null;
  }




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
    this.router.navigate(['/dashboard']);
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
  // change ditections end

  updateButtonClicked() {
    this.isUpdating = !this.isUpdating;
    this.updatedUserData = {
      firstName: this.newFirstName,
      lastName: this.newLastName,
      userName: this.newUserName,
      email: this.newEmail,
      password: this.newPassword,
      userImage: this.newImage
    }
    this._currentUserService.setCurrentUser(this.updatedUserData)

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






}
