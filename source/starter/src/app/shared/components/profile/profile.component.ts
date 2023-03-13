import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  breadscrums;

  constructor(private router : Router) {}
  ngOnInit() {
    const activeRoute = this.router.url.split("/")[1];
    this.breadscrums = [
      {
        title: 'Account',
        items: [activeRoute.charAt(0).toLocaleUpperCase() + activeRoute.slice(1)],
        active: 'Account'
      }
    ]    
  }
}
