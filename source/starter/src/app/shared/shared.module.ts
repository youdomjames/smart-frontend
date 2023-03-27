import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { FeatherIconsModule } from './components/feather-icons/feather-icons.module';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { PhoneNumberPipe } from './pipes/phone-number/phone-number.pipe';
import { AddressPipe } from './pipes/address/address.pipe';
@NgModule({
  declarations: [
    PhoneNumberPipe,
    AddressPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FeatherIconsModule,
    MaterialModule,
    
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FeatherIconsModule,
    PhoneNumberPipe,
    AddressPipe
  ],
  
})
export class SharedModule {}
