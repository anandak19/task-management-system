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
import {
  returnUserData,
} from '../../core/models/user-details';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UsersManagementService } from '../../shared/services/user/users-management.service';
import { CurrentUserManagementService } from '../../shared/services/user/current-user-management.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    FontAwesomeModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  constructor(
    private _fb: FormBuilder,
    private userService: UsersManagementService,
    private _route: Router,
    private currentUser: CurrentUserManagementService
  ) {}

  form!: FormGroup;
  public CurrentUserData?: returnUserData;
  isSubmitted: boolean = false;
  hidePassword: boolean = true;
  faLock = faLock;
  faEyeSlash = faEyeSlash
  faEye= faEye

  ngOnInit(): void {
    this.form = this._fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  login() {
    this.isSubmitted = true;
    if (this.form.valid) {
      const userData = this.form.value;
      this.userService.findUser(userData).subscribe(
        (res) => {
          if (res.isAuthenticated) {
            this.currentUser.setCurrentUser(res.user);
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Swal.fire({
              icon: 'success',
              title: 'Login successful!',
              position: 'center',
              showConfirmButton: false,
              timer: 3000,
            });
            this._route.navigateByUrl('/dashboard');
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'User not found !',
              text: 'try again',
              confirmButtonText: 'OK',
              confirmButtonColor: '#3d5653',
            });
            this.form.reset();
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Internal Server Error',
            text: 'Oops! Something went wrong',
            confirmButtonColor: '#153935',
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Please enter all details',
        confirmButtonColor: '#153935',
      });
    }
  }
}
