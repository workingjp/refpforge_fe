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
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
  }

  success(message: string) {
    this.open(message, 'success');
  }

  error(message: string) {
    this.open(message, 'error');
  }

  info(message: string) {
    this.open(message, 'info');
  }
}
