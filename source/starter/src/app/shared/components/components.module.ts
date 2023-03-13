import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared.module';
import { MaterialModule } from '../material.module';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';

@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent, ProfileComponent, ExpansionPanelComponent],
  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent, ExpansionPanelComponent],
})
export class ComponentsModule {}
