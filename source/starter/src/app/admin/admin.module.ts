import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TeacherModule } from '../teacher/teacher.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule, TeacherModule],
})
export class AdminModule {}
