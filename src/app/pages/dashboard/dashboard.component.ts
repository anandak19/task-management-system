import { Component } from '@angular/core';
import { CurrentUserService } from '../../core/services/Users/current-user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  currentUser: any;
  constructor(private userService: CurrentUserService) {
    this.currentUser = this.userService.getCurrentUser();
  }

  logout(){
    this.userService.logout()
  }

}
