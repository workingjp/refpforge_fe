import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  logInWithOTP: boolean = false;
  loginForm: FormGroup;
  enterOTP: boolean = false;
  verifyOTP: boolean = false;
  verifyOTPForm: FormGroup;
  savedEmail: any;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.authForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required]]
    });

    this.verifyOTPForm = this.fb.group({
      otp: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  createUser() {
    console.log(this.authForm.value);

    this.authService.createUser(this.authForm.value).subscribe({
      next: () => {
        window.location.href = '/dashboard';
      },
      error: err => {
        this.error = err.error.message;
      }
    });
  }

  sendOtp() {
    console.log(this.loginForm.value);

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

  verifyOtp() {
    console.log(this.savedEmail, this.verifyOTPForm.value);

    this.authService.verifyOtp(this.savedEmail, this.verifyOTPForm.value).subscribe({
      next: res => {
        this.authService.saveToken(res.token);
        window.location.href = '/dashboard';
      },
      error: err => {
        this.error = err.error.message;
      }
    });
  }

}
