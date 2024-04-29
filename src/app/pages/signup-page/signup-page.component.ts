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
import { UserDetails } from '../../core/models/user-details';
import { UserManagementService } from '../../core/services/Users/user-management.service';

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
  newUserDetails!: UserDetails;
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
      ], // Custom validator for matching passwords
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

  // sign up function ------------------
  signup() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.userService.AddtUserDetails(this.form.value).subscribe(
        (response) => {
          this.route.navigateByUrl("")
          // add a sucessfull signup toaster message here ------------
          console.log(response.userName);
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
