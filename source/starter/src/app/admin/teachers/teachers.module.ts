import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeachersRoutingModule } from './teachers-routing.module';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { DeleteDialogComponent } from './all-teachers/dialogs/delete/delete.component';
import { FormDialogComponent } from './all-teachers/dialogs/form-dialog/form-dialog.component';
import { TeachersService } from './all-teachers/teachers.service';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewComponent } from './all-teachers/dialogs/view/view.component';
import { PaymentComponent } from './all-teachers/dialogs/payment/payment.component';
@NgModule({
  declarations: [
    AllTeachersComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    ViewComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TeachersRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [TeachersService],
})
export class TeachersModule {}
