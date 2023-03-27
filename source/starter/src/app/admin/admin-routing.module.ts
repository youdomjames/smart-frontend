import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../shared/components/profile/profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'teachers',
    loadChildren: () =>
      import('./teachers/teachers.module').then((m) => m.TeachersModule),
  },
  // {
  //   path: 'students',
  //   loadChildren: () =>
  //     import('./students/students.module').then((m) => m.StudentsModule),
  // },
  // {
  //   path: 'courses',
  //   loadChildren: () =>
  //     import('./courses/courses.module').then((m) => m.CoursesModule),
  // },
  // {
  //   path: 'library',
  //   loadChildren: () =>
  //     import('./library/library.module').then((m) => m.LibraryModule),
  // },
  {
    path: 'account',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
