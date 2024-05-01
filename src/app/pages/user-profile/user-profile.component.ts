import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserManagementService } from '../../core/services/Users/user-management.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  constructor(private userService: UserManagementService) {}

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



}
