import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from './students.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Students } from './students.model';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.sass'],
})
export class AllStudentsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'img',
    'name',
    'course',
    'gender',
    'mobile',
    'email',
    'performance',
    'actions',
  ];
  examsType = [
    'Exam 1',
    'Assignment',
    "Exam 2"
  ]
  breadscrums = [
    {
      title: 'All Student',
      items: ['Student'],
      active: 'All Student',
    },
  ];
  exampleDatabase: StudentsService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Students>(true, []);
  id: number;
  students: Students | null;
  courses = ['Mathematics', 'Civil', 'Computer', 'Science'];
  selectedCourse:string;
  isMultipleScoresStep:boolean = false;
  disabledInput:boolean = true;
  studentScores:{}[]=[];
  examTypeActivated:boolean = false;
  selectedExamType:string;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public studentsService: StudentsService,
    private snackBar: MatSnackBar,
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
    this.selectedCourse = '/*/-*/'
    this.loadData();
  }
  refresh() {
    this.loadData();
  }

  view(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, { width:'50%', height: 'fit-content',
      data: {
        students: row,
        action: 'view/add-score',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {

        this.refreshTable();
      }
    });
  }

  activateMultipleScoresLevel(){
    this.isMultipleScoresStep = true;
    //Hiding rows using filter
    this.displayedColumns.pop();
    this.displayedColumns.pop()
    this.displayedColumns.push('score')
    this.dataSource.filter = this.selectedCourse.toLowerCase()
  }

  applyFilter(){
    if(this.selectedExamType!=null) this.dataSource.filter = this.selectedCourse.toLowerCase()
    this.disabledInput = false
  }

  deactivateMultipleScoresLevel(){
    this.isMultipleScoresStep = false;
    this.displayedColumns.pop();
    this.displayedColumns.push('performance', 'actions')
    this.dataSource.filter = '';
  }

  saveScores(){
    console.log(this.studentScores);
    this.showNotification(
      'snackbar-success',
      'All scores Successfully added!',
      'bottom',
      'center'
    );
  }

  addScore(id, department, $event){
    if($event.target.value==0) return;
    const existingStudentScore = this.studentScores.find((student:any)=>student.id==id && student.course==department)    
    if(existingStudentScore){
      const index = this.studentScores.indexOf(existingStudentScore);
      this.studentScores[index] = {id:id, course: department, examType: this.selectedExamType, score:$event.target.value/100}
    }else this.studentScores.push({id:id, course: department, examType: this.selectedExamType, score:$event.target.value/100})    
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  
  public loadData() {
    this.exampleDatabase = new StudentsService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    if(this.filter){
      this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
        () => {
          if (!this.dataSource) {
            return;
          }
          this.dataSource.filter = this.filter.nativeElement.value;
        }
      );
    }
  }

  // context menu
  // onContextMenu(event: MouseEvent, item: Students) {
  //   event.preventDefault();
  //   this.contextMenuPosition.x = event.clientX + 'px';
  //   this.contextMenuPosition.y = event.clientY + 'px';
  //   this.contextMenu.menuData = { item: item };
  //   this.contextMenu.menu.focusFirstItem('mouse');
  //   this.contextMenu.openMenu();
  // }
}








export class ExampleDataSource extends DataSource<Students> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Students[] = [];
  renderedData: Students[] = [];
  constructor(
    public exampleDatabase: StudentsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Students[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllStudentss();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((students: Students) => {
            const searchStr = (
              students.id +
              students.name +
              students.email +
              students.department+
              students.mobile
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: Students[]): Students[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'email':
          [propertyA, propertyB] = [a.email, b.email];
          break;
        case 'performance':
          [propertyA, propertyB] = [a.perfomance, b.perfomance];
          break;
        case 'time':
          [propertyA, propertyB] = [a.department, b.department];
          break;
        case 'mobile':
          [propertyA, propertyB] = [a.mobile, b.mobile];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
