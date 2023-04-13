import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Teachers } from '../../teachers.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent {
  teacher: Teachers;
  displayedColumns= [
    {name: "Code", prop:"code"},
    {name: "Name", prop:"name"},
    {name: "Number Of Students", prop:"numberOfStudents"}
  ]
  limit=3;
  tableTitle = "Active Courses";
  constructor(
    public dialogRef: MatDialogRef<ViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){
      this.teacher = data.teacher
    }
    
}
