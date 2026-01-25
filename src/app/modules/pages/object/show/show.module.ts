import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show.component';
import { ShowRoutingModule } from './show-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ConfirmPopup, ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    imports: [CommonModule, ShowRoutingModule, SharedModule, ConfirmPopupModule, ConfirmDialogModule,MultiSelectModule],
    declarations: [ShowComponent],
    providers:[ConfirmationService]
})
export class ShowModule {}
