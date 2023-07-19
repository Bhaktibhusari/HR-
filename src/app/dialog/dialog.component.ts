import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
// import { Input } from '@angular/core';

// @Input() dataFromParent : string
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  holidayForm: FormGroup | any;
  actionBtn: string = "Save";
  // display: any;

  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    // @Inject(MAT_DIALOG_DATA) public employee: any,
    private http: HttpClient,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.holidayForm = this.formBuilder.group({
      holidayDate: ['', Validators.required],
      day: ['', Validators.required],
      holidayname: ['', Validators.required]
    });

    console.log(this.editData);

    if (this.editData) {
      this.actionBtn = "update";
      this.holidayForm.controls['holidayDate'].setValue(this.editData.holidayDate);
      this.holidayForm.controls['day'].setValue(this.editData.day);
      this.holidayForm.controls['holidayname'].setValue(this.editData.holidayname);
    }

    // if (this.editData) {
    //   this.display = 'holiday';
    //   console.log(this.display, 'bbb')
    // }
    // if (this.employee) {
    //   this.display = 'employee';
    //   console.log(this.display, 'hhh')
    // }
  }

  addHoliday() {
    console.log(this.holidayForm.value);
    if (!this.editData) {
      if (this.holidayForm.valid) {
        this.http.post('http://localhost:3000/companyHoliday', this.holidayForm.value).subscribe({
          next: (res) => {
            console.log("Product added successfully");
            this.holidayForm.reset();
            this.dialogRef.close('saved');
          },
          error: () => {
            console.log("Error while adding Holiday");
          }
        })
      }
    } else {
      this.updateHoliday()
    }

  }

  updateHoliday() {
    this.http.put('http://localhost:3000/companyHoliday', this.holidayForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert("Holiday updated Successfully");
        this.holidayForm.reset();
        this.dialogRef.close("update");
      },
      error: () => {
        alert("Error while updating holiday record!");
      }
    })
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    });
  }


}
