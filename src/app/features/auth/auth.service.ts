import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:5000/api/auth';

  private TOKEN_KEY = 'token';
  private EXPIRY_KEY = 'token_expiry';

  constructor(private http: HttpClient) {}

  createUser(data: any): Observable<any> {
    console.log("DATA==>>", data);
    return this.http.post(`${this.API_URL}/create-user`,  data );
  }

  loginUser(data: any): Observable<any> {
    console.log("DATA==>>", data);
    return this.http.post(`${this.API_URL}/login-pass`,  data );
  }


  sendOtp(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/send-otp`, data );
  }

  verifyOtp(data2: any, data: any): Observable<any> {
    console.log(data2);
    let mobile = data2.mobile;
    let otp = data.otp;
    return this.http.post(`${this.API_URL}/verify-otp`, { mobile, otp });
  }

  getProfileTemp(): Observable<any> {
    return this.http.get('http://localhost:5000/api/user/profile');
  }


  saveToken(token: string): void {
    const expiryTime = Date.now() + (3 * 24 * 60 * 60 * 1000); // 3 days
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.EXPIRY_KEY, expiryTime.toString());
  }

  // ✅ Get token only if valid
  getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const expiry = localStorage.getItem(this.EXPIRY_KEY);

    if (!token || !expiry) {
      return null;
    }

    if (Date.now() > Number(expiry)) {
      this.clearToken(); // auto logout
      return null;
    }

    return token;
  }

  // ✅ Logged-in check
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ✅ Explicit expiry check
  isTokenExpired(): boolean {
    const expiry = localStorage.getItem(this.EXPIRY_KEY);
    return !expiry || Date.now() > Number(expiry);
  }

  // ✅ Logout / clear everything
  logout(): void {
    this.clearToken();
  }

  // ✅ Internal cleanup
  private clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRY_KEY);
  }
}
