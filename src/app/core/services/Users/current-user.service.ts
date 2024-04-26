import { Injectable } from '@angular/core';
import { FullUserDetails, UserDetails } from '../../models/user-details';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor() { }

  private currentUser: any;

  // to store the current user deatails 
  setCurrentUser(user: any): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // to get the current user deatails 
  getCurrentUser(): FullUserDetails {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  // to clear the local stored data of current user 
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }


}
