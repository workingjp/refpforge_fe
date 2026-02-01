import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  workoutApi = new Subject();

  constructor() { }

  getAllWorkOutData(res: any) {
    this.workoutApi.next(res);
  }
}
