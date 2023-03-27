import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { TeachersService } from '../../teachers.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Teachers } from '../../teachers.model';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  basicInfoForm: UntypedFormGroup;
  moreInfoForm: UntypedFormGroup;
  profilePictureForm: UntypedFormGroup;
  addressFormGroup:UntypedFormGroup;
  teachers: Teachers;
  wordCount: number;
  isLinear: boolean;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public teachersService: TeachersService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.teachers.name;
      this.teachers = data.teachers;
    } else if (this.action === 'add') {
      this.dialogTitle = 'New Teacher';
      this.teachers = new Teachers({});
    }
    this.createContactForm();
  }

  countWords($event) {
    this.wordCount = $event.target.value.length;
  }
  createContactForm() {
    this.addressFormGroup = this.fb.group({
      street: [this.teachers.address.street, [Validators.required]],
      city: [this.teachers.address.city, [Validators.required]],
      state: [this.teachers.address.state, [Validators.required]],
      postalCode: [this.teachers.address.postalCode, [Validators.required]]
    });
    this.basicInfoForm = this.fb.group({
      id: [this.teachers.id],
      firstName: [this.teachers.firstName, [Validators.required]],
      lastName: [this.teachers.lastName, [Validators.required]],
      dateOfBirth: [this.teachers.dateOfBirth, [Validators.required]],
      email: [
        this.teachers.email,
        [Validators.required, Validators.email],
      ],
      gender: [this.teachers.gender, [Validators.required]],
      address: this.addressFormGroup,
      about: [this.teachers.about, [Validators.maxLength(500)]],
      mobile: [this.teachers.mobile, [Validators.required]],
    });

    this.moreInfoForm = this.fb.group({
      degree: [this.teachers.degree],
      joiningDate: [
        formatDate(this.teachers.joiningDate, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      salary: [this.teachers.salary, [Validators.required]]
    });

    this.profilePictureForm = this.fb.group({
      img: [this.teachers.img],
    });
  }
 
  submit() {
    this.teachers = {...this.basicInfoForm.getRawValue(), ...this.moreInfoForm.getRawValue(), ...this.profilePictureForm.getRawValue()} as Teachers;
    if(this.action==='edit') {
      this.editTeacher();
      return;
    }
    this.addTeacher();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addTeacher(): void {
    this.teachersService.addTeachers(this.teachers);
  }
  editTeacher(){
    this.teachersService.updateTeachers(this.teachers)
  }

}
