import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { newUserData } from '../../core/models/user-details';
import Swal from 'sweetalert2'
import { UsersManagementService } from '../../shared/services/user/users-management.service';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent {

  // declarations 
  form!: FormGroup;
  newUserDetails!: newUserData;
  isSubmitted: boolean = false;
  tooShort?: boolean;

  constructor(
    private _fb: FormBuilder,
    private userService: UsersManagementService,
    private route: Router
  ) {}



  ngOnInit(): void {
    this.form = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      email: [
        '',
        Validators.compose([Validators.required, this.emailValidator]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, this.passwordValidator]),
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          this.confirmPasswordValidator,
        ]),
      ],
    });
  }

  // form Validators ---------
  emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const email = control.root.get('email')?.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return { invalidEmail: true };
    }
    return null;
  }

  // validating password 
  passwordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.root.get('password')?.value;
    if (!password || password.length < 5) {
      return { tooShort: true };
    } else if (!/[A-Z]/.test(password)) {
      return { noUppercase: true };
    } else if (!/[a-z]/.test(password)) {
      return { noLowercase: true };
    } else if (!/[\W_]/.test(password)) {
      return { noSpecialChar: true };
    } else if (!/\d/.test(password)) {
      return { noNumber: true };
    }
    return null;
  }

  // to confirm password 
  confirmPasswordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.root.get('password');
    return password && control.value !== password.value
      ? { misMatch: true }
      : null;
  }

  // functions ------------

  // sign up function ------------------
  signup() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.newUserDetails = {
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        userName: this.form.value.userName,
        email: this.form.value.email,
        password: this.form.value.password,
        userImage: "../../../assets/images/user/initial-user.png"
      };

      this.userService.AddtUserDetails(this.newUserDetails).subscribe(
        (response) => {
          const Toast = Swal.mixin({
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Signed in successfully"
          });
          this.route.navigateByUrl('')
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
        icon: 'error',
        title: 'Invalid',
        text: 'Fill the form with valid details',
        confirmButtonColor: '#153935',
      });
    }
  }
}
