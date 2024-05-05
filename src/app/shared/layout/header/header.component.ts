import { Component, DoCheck, OnInit } from '@angular/core';
import { SignupPageComponent } from '../../../pages/signup-page/signup-page.component';
import { Router, RouterOutlet } from '@angular/router';
import { returnUserData } from '../../../core/models/user-details';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { CurrentUserManagementService } from '../../services/user/current-user-management.service';
import { UsersManagementService } from '../../services/user/users-management.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, SignupPageComponent, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements DoCheck, OnInit {
  public currentUserData?: returnUserData;
  public userImage?: string;
  isUserLogin = false;
  faCheck = faCalendarCheck
  

  constructor(
    private _currentUserService: CurrentUserManagementService,
    private _userManagement: UsersManagementService,
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
