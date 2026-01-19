import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  identifier: string = '';
  otp: string = '';
  step: 'SEND_OTP' | 'VERIFY_OTP' = 'SEND_OTP';

  loading: boolean = false;
  error: string = '';
  userInput: any;

  authForm: FormGroup;
  loginForm: FormGroup;
  verifyOTPForm: FormGroup;

  logInWithOTP: boolean = false;
  enterOTP: boolean = false;
  verifyOTP: boolean = false;

  savedEmail: any;

  showPopup: boolean = false;
  popupMessage: string = '';

  isLogin: boolean = true; // true = Login form, false = Register form

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{3,}$/
          )
        ]
      ]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.verifyOTPForm = this.fb.group({
      otp: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  createUser(): void {
    const payload = this.authForm.value;

    this.authService.createUser(payload).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);
        this.snackbar.success('Login successful 🎉');
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        const msg =
          err?.error?.message ||
          err?.message ||
          'Something went wrong. Please try again';

        this.snackbar.info(msg);
      }
    });
  }

  loginUser(): void {
    const loginData = this.loginForm.value;

    this.authService.loginUser(loginData).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);
        this.snackbar.success('Login successful 🎉');
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        const msg =
          err?.error?.message ||
          err?.message ||
          'Something went wrong. Please try again';

        this.snackbar.info(msg);
      }
    });
  }

  sendOtp(): void {
    this.authService.sendOtp(this.loginForm.value).subscribe({
      next: () => {
        this.savedEmail = this.loginForm.value;
        this.enterOTP = true;
      },
      error: err => {
        this.error = err.error.message;
      }
    });
  }

  verifyOtp(): void {
    this.authService
      .verifyOtp(this.savedEmail, this.verifyOTPForm.value)
      .subscribe({
        next: res => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          this.error = err.error.message;
        }
      });
  }

  // getters (used in template)
  get firstname() {
    return this.authForm.get('firstname');
  }

  get lastname() {
    return this.authForm.get('lastname');
  }

  get email() {
    return this.authForm.get('email');
  }

  get mobile() {
    return this.authForm.get('mobile');
  }

  get password() {
    return this.authForm.get('password');
  }

  showLogin(): void {
    this.isLogin = true;
  }

  showRegister(): void {
    this.isLogin = false;
  }
}
