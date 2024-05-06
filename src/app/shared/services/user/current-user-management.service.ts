import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { returnUserData } from '../../../core/models/user-details';
import { Router } from '@angular/router';
import { UsersManagementService } from './users-management.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserManagementService {

  constructor(private _router: Router, public _userService: UsersManagementService) { }

  public currentUser?: returnUserData | any;

  // to store the current user deatails 
  setCurrentUser(user: any): void {
    this.currentUser = { ...user };    
  }
  // localStorage.setItem('currentUser', JSON.stringify(user));

  // to get the current user deatails 
  getCurrentUser(): returnUserData | any {
    return this.currentUser;
  }
  // return JSON.parse(localStorage.getItem('currentUser') || '{}');

  // to clear the local stored data of current user 
  logout(): void {
    this.currentUser = null;
    this._router.navigateByUrl('')
    this._userService.isLogout(false);
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Logout successfully"
    });
  }

}
