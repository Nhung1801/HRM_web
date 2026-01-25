import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { PopupApproveComponent } from './popup-approve.component';
import { PopupApproveRoutingModule } from './popup-approve-routing.module';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [PopupApproveComponent],
  imports: [
    CommonModule,
    SharedModule,
    PopupApproveRoutingModule,
    FileUploadModule,
    MultiSelectModule
  ],
  exports: [PopupApproveComponent]
})
export class PopupApproveModule { }
export {PopupApproveComponent}
