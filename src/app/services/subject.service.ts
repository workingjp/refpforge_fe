import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor() { }

  private bmrPopupSubject = new BehaviorSubject<boolean>(false);
  bmrPopup$ = this.bmrPopupSubject.asObservable();

  open(): void {
    this.bmrPopupSubject.next(true);
  }

  close(): void {
    this.bmrPopupSubject.next(false);
  }
}
