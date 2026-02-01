import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservableService } from './observable.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = 'http://localhost:5000/api';

  constructor(
    private http: HttpClient,
    private _observable: ObservableService
  ) { }

  getAllWorkOutDataApi() {
    this.http.post(`${this.API_URL}/exercises/getAllWorkOutData`, {}).subscribe(res => {
      this._observable.getAllWorkOutData(res);
    });
  }

}
