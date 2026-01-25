import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show.component';
import { ShowRoutingModule } from './show-routing.module';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ShowRoutingModule,
        SharedModule,
        ConfirmPopupModule,
        ConfirmDialogModule,
        SplitButtonModule,
        TableModule,
        ProgressSpinnerModule,
    ],
    declarations: [ShowComponent],
})
export class ShowModule {}
