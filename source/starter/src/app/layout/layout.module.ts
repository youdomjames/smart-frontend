import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthLayoutComponent } from './app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './app-layout/main-layout/main-layout.component';
@NgModule({
  imports: [CommonModule, NgModule, MatTabsModule],
  declarations: [AuthLayoutComponent, MainLayoutComponent],
})
export class LayoutModule {}
