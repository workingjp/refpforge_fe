import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BmrService {
  private API_URL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {

  }
  addbmrscore(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/userbody/bmrscore`, data);
  }
}
