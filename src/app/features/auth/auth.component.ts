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
  showPopup = false;
  popupMessage = '';
  isLogin = true; // true = Login form, false = Register form

  
  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.authForm = this.fb.group({
      firstname: ['', [Validators.required,Validators.minLength(2),  Validators.pattern(/^[a-zA-Z ]+$/)]],
      lastname: ['', [Validators.required,Validators.minLength(2),  Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
      password: ['', [Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{3,}$/)]],
    });

   this.loginForm = this.fb.group({
  email: [
    '',
    [Validators.required, Validators.email]
  ],
  password: [
    '',
    [
      Validators.required,
      Validators.minLength(6),
    ]
  ]
});


    this.verifyOTPForm = this.fb.group({
      otp: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

createUser() {
  console.log('called');
  
  // if (this.authForm.invalid) {
  //   this.authForm.markAllAsTouched();
  //   return;
  // }

  console.log('authform ');
  
  const payload = this.authForm.value;

  this.authService.createUser(payload).subscribe({
    next: (res: any) => {

      // this.openPopup(res?.message || 'User created successfully');
      // redirect after success
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    },
    error: (err: any) => {
      const msg =
        err?.error?.message ||
        err?.message ||
        'Something went wrong. Please try again';

      this.openPopup(msg);
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

  get firstname() { return this.authForm.get('firstname'); }
  get lastname() { return this.authForm.get('lastname'); }
  get email() { return this.authForm.get('email') }
  // && this.loginForm.get('email');
  get mobile() { return this.authForm.get('mobile'); }
  get password() { return this.authForm.get('password'); }

  openPopup(msg: string) {
    this.popupMessage = msg;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
  showLogin() {
    this.isLogin = true;
  }

  showRegister() {
    this.isLogin = false;
  }

}
