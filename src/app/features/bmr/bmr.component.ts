import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BmrService } from './bmr.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { SubjectService } from 'src/app/core/services/subject.service';

@Component({
  selector: 'app-bmr',
  templateUrl: './bmr.component.html',
  styleUrls: ['./bmr.component.scss']
})
export class BmrComponent implements OnInit {

  bmrForm!: FormGroup;
  showBmrPopup: boolean = false; // <-- flag to show/hide popup

  constructor(
    private fb: FormBuilder,
    private BMR_Service: BmrService,
    private snackbar: SnackbarService,
    private subject : SubjectService

    
  ) {

      console.log('BMR component created');

  }

  ngOnInit(): void {
    this.bmrForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]
      ],
      gender: ['', Validators.required],
      age: [
        '',
        [Validators.required, Validators.min(10), Validators.max(100)]
      ],
      height: [
        '',
        [Validators.required, Validators.min(100), Validators.max(250)]
      ],
      weight: [
        '',
        [Validators.required, Validators.min(30), Validators.max(300)]
      ]
    });

    // this.openBmrPopup()
  }

  close(): void{
    this.subject.close();
  }
  // getter for easy access in template
  get f() {
    return this.bmrForm.controls as {
      name: AbstractControl;
      gender: AbstractControl;
      age: AbstractControl;
      height: AbstractControl;
      weight: AbstractControl;
    };
  }

  // open popup
  openBmrPopup() {
    this.showBmrPopup = true;
  }

  // close popup
  closeBmrPopup() {
    this.showBmrPopup = false;
  }

  calculateBmr() {
    if (this.bmrForm.invalid) {
      this.bmrForm.markAllAsTouched();
      return;
    }

    this.BMR_Service.addbmrscore(this.bmrForm.value).subscribe({
      next: (res: any) => {
        console.log('BMR Result:', res.bmr);
        this.snackbar.success('Your BMR score is ' + res.bmr);
        sessionStorage.setItem('isNewUser','0')
        this.close(); // close popup after calculation
      },
      error: (err: any) => {
        const msg =
          err?.error?.message ||
          err?.message ||
          'Something went wrong. Please try again';
        this.snackbar.info(msg);
      }
    });

    console.log('BMR Form Data:', this.bmrForm.value);
  }
}
