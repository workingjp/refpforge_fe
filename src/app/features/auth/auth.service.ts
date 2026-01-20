import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) { }

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
    console.log(data);
    
    
    let identifier = data2.email;
    let otp = data.otp;
    return this.http.post(`${this.API_URL}/verify-otp`, { identifier, otp });
  }

  getProfileTemp() {
    return this.http.get('http://localhost:5000/api/user/profile');
  }


  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
