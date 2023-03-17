import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentsService } from '../../students.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { Students } from '../../students.model';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface PeriodicElement {
  date: string;
  type: string;
  score: number;
  status: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    date: '01/02/2023',
    type: 'Assignment',
    score: 0.6,
    status: 'PASSED',
  },
  {
    date: '01/01/2023',
    type: 'Exam',
    score: 0.8,
    status: 'PASSED',
  },
  {
    date: '12/12/2022',
    type: 'Exam',
    score: 0.4,
    status: 'FAILED',
  },
  {
    date: '10/10/2022',
    type: 'Assignment',
    score: 0.9,
    status: 'PASSED',
  }
];
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '120px',
      })),
      state('closed', style({
        height: '0px',
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  stdForm: UntypedFormGroup;
  isFormOpened:boolean=false;
  students: Students;
  selectedValue:string;
  courses:string[];
  dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  displayedColumns: string[] = [
    'date',
    'type',
    'score',
    'status'
  ];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public studentsService: StudentsService,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar,
  ) {
    // Set the defaults
    this.action = data.action;

    if (this.action ==='view/add-score') {
      this.dialogTitle = data.students.name;
      this.students = data.students;
    } else {
      this.dialogTitle = 'Select Course';
      this.courses = ['Mathematics', 'Civil', 'Computer', 'Science'];
    }
    this.stdForm = this.createContactForm();
  }
  
  formControl = new UntypedFormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      date: ['', [Validators.required]],
      type: ['', [Validators.required]],
      score: ['',[Validators.required]]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.isFormOpened = false;
    this.showNotification(
      'snackbar-success',
      'Score Successfully added!',
      'bottom',
      'center'
    );
    // this.studentsService.addStudents(this.stdForm.getRawValue());
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  badgeClass(status:string):string{
    if(status === 'PASSED') return 'badge col-green';
    return 'badge col-red';
  }
  select(){
    this.dialogRef.close({data: this.selectedValue})
  }
}
