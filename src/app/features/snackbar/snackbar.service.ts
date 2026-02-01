import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  open(
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
    duration = 3000
  ) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message, type },
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar']
    });
  }

  success(message: string) {
  this.snackBar.openFromComponent(SnackbarComponent, {
    data: { message },
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    panelClass: ['success']
  });
}

error(message: string) {
  this.snackBar.openFromComponent(SnackbarComponent, {
    data: { message },
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    panelClass: ['error']
  });
}

info(message: string) {
  this.snackBar.openFromComponent(SnackbarComponent, {
    data: { message },
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    panelClass: ['info']
  });
}

}
