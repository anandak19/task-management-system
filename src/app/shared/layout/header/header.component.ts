import { Component, DoCheck, OnInit } from '@angular/core';
import { SignupPageComponent } from '../../../pages/signup-page/signup-page.component';
import { Router, RouterOutlet } from '@angular/router';
import { CreateTaskPageComponent } from '../../../pages/create-task-page/create-task-page.component';
import { CurrentUserService } from '../../../core/services/Users/current-user.service';
import { returnUserData } from '../../../core/models/user-details';
import { UserManagementService } from '../../../core/services/Users/user-management.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, SignupPageComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements DoCheck, OnInit {
  public currentUserData?: returnUserData;
  public userImage?: string;
  isUserLogin = false;
  

  constructor(
    private _currentUserService: CurrentUserService,
    private _userManagement: UserManagementService,
    private _router: Router
  ) {}
  

  // to navigate to profile 
  viewProfileClicked() {
    this._router.navigateByUrl('/profile');
  }

  ngOnInit(): void {
    this.userImage = '../../../../assets/images/user/initial-user.png'
  }
  // check if the user is loged in
  // then chege the profile icon 
  ngDoCheck(): void {
    this.isUserLogin = this._userManagement.isUserAuthenticated();
    if (this.isUserLogin) {
      this.currentUserData = this._currentUserService.getCurrentUser();
      this.userImage = this.currentUserData?.userImage;
    }
  }
  // clear current user image 
  ngOnDestroy(): void{
    this.isUserLogin = false
    this.userImage = '../../../../assets/images/user/initial-user.png';
  }
}
