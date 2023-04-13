import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  breadscrums;
  hide:boolean = true;
  register: UntypedFormGroup;
  form: UntypedFormGroup;
  wordCount:number;
  constructor(private router : Router, private fb: UntypedFormBuilder) {}
  ngOnInit() {
    const activeRoute = this.router.url.split("/")[1];
    this.breadscrums = [
      {
        title: 'Account',
        items: [activeRoute.charAt(0).toLocaleUpperCase() + activeRoute.slice(1)],
        active: 'Account'
      }
    ] 
    this.initForm()
  }
  initForm() {
    this.form = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      phoneNumber: ['', [Validators.maxLength(14), Validators.required]],
      address: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      about: ['', [Validators.maxLength(500)]],
      profilePicture: ['', Validators.required],
      termcondition: [false, [Validators.requiredTrue]],
    });
  }

  countWords($event){
    console.log($event.target.value.length);
    
    this.wordCount = $event.target.value.length;
  }
  
  onFormSubmit(){
    console.log(this.form.value);
    
  }
}
