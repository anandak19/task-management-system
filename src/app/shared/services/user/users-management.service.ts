import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { newUserData, userLogin, UserDetails, returnUserData } from '../../../core/models/user-details';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementService {

  private userUrl = 'http://localhost:3000/user';
  private isAuthenticatedUser = false;

  constructor(private _http: HttpClient) {}

  // to add new user upon signup
  AddtUserDetails(newUser: newUserData): Observable<any> {
    return this._http.post(`${this.userUrl}`, newUser);
  }

  // to find the user trying to login
  findUser(
    userData: userLogin
  ): Observable<{ isAuthenticated: boolean; user?: UserDetails }> {
    return this._http.get<UserDetails[]>(this.userUrl).pipe(
      map((users) => {
        const user = users.find(
          (user) =>
            user.userName === userData.userName &&
            user.password === userData.password
        );
        const isAuthenticated = !!user;
        this.isAuthenticatedUser = isAuthenticated;
        return { isAuthenticated, user };
      })
    );
  }

  // to check if the user is authenticated
  // it is used in authguard for guarding purpose
  isUserAuthenticated(): boolean {
    return this.isAuthenticatedUser;
  }
  isLogout(value: boolean) {
    this.isAuthenticatedUser = value;
  }

  // to update user data
  updateUser(userData: returnUserData | any, userId: string): Observable<any> {
    return this._http.patch(`${this.userUrl}/${userId}`, userData);
  }
}
