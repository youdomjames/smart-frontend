import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.sass'],
})
export class TimetableComponent implements OnInit {
  breadscrums = [
    {
      title: 'Timetable',
      items: ['Student'],
      active: 'Timetable',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
