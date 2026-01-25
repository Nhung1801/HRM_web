import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show.component';
import { ShowRoutingModule } from './show-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ChartModule } from 'primeng/chart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
@NgModule({
    imports: [
        ConfirmPopupModule,
        CommonModule,
        OverlayPanelModule,
        ShowRoutingModule,
        SharedModule,
        ChartModule,
    ],
    declarations: [ShowComponent],
})
export class ShowModule {}
