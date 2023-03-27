import { Component, OnInit, ViewChild, TemplateRef, EventEmitter, Output, Input } from '@angular/core';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableButton } from './models/table-button'
@Component({
  selector: 'app-ngx-datatable',
  templateUrl: './ngx-datatable.component.html',
  styleUrls: ['./ngx-datatable.component.sass'],
})
export class NgxDatatableComponent implements OnInit {

  @Input() data;
  @Input() columns:TableColumn[];
  @Input() buttons:TableButton[];
  @Input() limit:number;
  @Input() title:string;


  @Output() view = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() add;
  @Output() delete = new EventEmitter();

  @ViewChild('roleTemplate', { static: true }) roleTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  filteredData = [];
  constructor(
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {   
    if(this.data){
      this.filteredData = [...this.data]
    }
  }
  getCellClass({ row, column, value }){
    if(column.prop === 'gender'){
      if(value === 'female') return 'material-icons col-purple fs-2'
      if(value === 'male') return 'material-icons col-blue fs-2'
      return 'material-icons col-indigo fs-2'
    }
    if(column.prop === 'payment_status'){
      if(value === 'unpaid') return 'material-icons col-red fs-2'
      if(value === 'paid') return 'material-icons col-green fs-2'
    }
    
    
  }
  buttonClick(action : string, row){
    if(action === 'view'){
      this.view.emit(row)
    }else if (action === 'edit'){
      this.edit.emit(row)
    } else if (action === 'add'){
      this.add = new EventEmitter();
      this.add.emit(row);
    }
  }
  filterDatatable(event) {
    // get the value of the key pressed and make it lowercase
    const val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    const colsAmt = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.filteredData[0]);
    // assign filtered matches to the active datatable
    this.data = this.filteredData.filter(function (item) {
      // iterate through each row's column data
      for (let i = 0; i < colsAmt; i++) {
        // check for a match
        if (
          item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 ||
          !val
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}

