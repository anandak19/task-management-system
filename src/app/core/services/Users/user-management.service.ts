import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails, userLogin } from '../../models/user-details';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private userUrl = 'http://localhost:3000/user';
  // http://localhost:3000/userTasks
  private isAuthenticatedUser = false;

  constructor(private _http: HttpClient) {}

  // to add new user upon signup 
  AddtUserDetails(newUser: UserDetails): Observable<any> {
    return this._http.post(`${this.userUrl}`, newUser);
  }

  // to find the user trying to login 
  findUser(userData: userLogin): Observable<{ isAuthenticated: boolean, user?: UserDetails }> {
    return this._http.get<UserDetails[]>(this.userUrl).pipe(
      map(users => {
        const user = users.find(user => 
          user.userName === userData.userName && user.password === userData.password
        );
        const isAuthenticated = !!user;
        this.isAuthenticatedUser  = isAuthenticated
        return { isAuthenticated, user };
      })
    );
  }

  // to check if the user is authenticated 
  // it is used in authguard for guarding purpose 
  isUserAuthenticated(): boolean {
    return this.isAuthenticatedUser;
  }

}
