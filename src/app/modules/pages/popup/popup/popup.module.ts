import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup.component';
import { PopupRoutingModule } from './popup-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { PopupApproveModule } from "../../popup-approve/popup-approve.module";
import { MultiSelectModule } from 'primeng/multiselect';
@NgModule({
    imports: [CommonModule, PopupRoutingModule, SharedModule, PopupApproveModule,MultiSelectModule],
    declarations: [PopupComponent],
   exports: [PopupComponent],

})
export class PopupModule {}

export { PopupComponent };

