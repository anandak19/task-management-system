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
import { UserDetails, newUserData } from '../../core/models/user-details';
import { UserManagementService } from '../../core/services/Users/user-management.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent {
  constructor(
    private _fb: FormBuilder,
    private userService: UserManagementService,
    private route: Router
  ) {}

  form!: FormGroup;
  newUserDetails!: newUserData;
  isSubmitted: boolean = false;
  tooShort?: boolean;

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
        userImage: '../../../assets/images/user/user.jpg'
      };

      this.userService.AddtUserDetails(this.newUserDetails).subscribe(
        (response) => {

          // add a sucessfull signup toaster message here ------------
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
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
          this.route.navigateByUrl('login')
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('An error occured');
    }
  }
}
