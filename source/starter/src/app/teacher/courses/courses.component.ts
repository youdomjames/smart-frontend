import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass']
})
export class CoursesComponent implements OnInit {
  breadscrums = [
    {
      title: 'Courses',
      items: ['Student'],
      active: 'Courses',
    },
  ];
  panelOpenState = false;
  dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  displayedColumns: string[] = [
    'date',
    'type',
    'score',
    'status'
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource2.paginator = this.paginator;
  }

  badgeClass(status:string):string{
    if(status === 'PASSED') return 'badge col-green';
    return 'badge col-red';
  }

  openAssignmentModal(){
    
  }
}
