import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserManagementService } from '../../core/services/Users/user-management.service';
import { CurrentUserService } from '../../core/services/Users/current-user.service';
import { FullUserDetails, UserDetails } from '../../core/models/user-details';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  constructor(
    private _fb: FormBuilder,
    private userService: UserManagementService,
    private _route: Router,
    private currentUser: CurrentUserService
  ) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this._fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.form.valid) {
      const userData = this.form.value;
      this.userService.findUser(userData).subscribe(
        (user) => {
          if (user.isAuthenticated) {
            this.currentUser.setCurrentUser(user.user)            
            this._route.navigateByUrl('/dashboard')
          } else {
            // User not found, handle non-authenticated user
            alert('User not found');
            // display an error message, reset the form, etc.
            this.form.reset();
          }
        },
        (error) => {
          console.error('Error:', error);
          // Handle any errors that occur during the HTTP request
        }
        
      )
    }
  }
}
