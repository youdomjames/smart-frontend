import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { CoursesComponent } from './courses/courses.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'account',
    component: ProfileComponent
  },
  {
    path: 'students',
    component: AllStudentsComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
