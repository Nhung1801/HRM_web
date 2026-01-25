import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show.component';
import { ShowRoutingModule } from './show-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SplitButtonModule } from 'primeng/splitbutton';

@NgModule({
    imports: [
        CommonModule,
        ShowRoutingModule,
        SharedModule,
        ConfirmPopupModule,
        ConfirmDialogModule,
        SplitButtonModule,
    ],
    declarations: [ShowComponent],
})
export class ShowModule {}
