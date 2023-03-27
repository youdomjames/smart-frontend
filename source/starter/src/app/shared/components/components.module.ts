import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared.module';
import { MaterialModule } from '../material.module';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { NgxDatatableComponent} from './table/ngx-datatable/ngx-datatable.component'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent, ProfileComponent, ExpansionPanelComponent, NgxDatatableComponent],
  imports: [SharedModule, NgxDatatableModule],
  exports: [FileUploadComponent, BreadcrumbComponent, ExpansionPanelComponent, NgxDatatableComponent],
})
export class ComponentsModule {}
