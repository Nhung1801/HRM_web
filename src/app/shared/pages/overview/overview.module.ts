import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';

@NgModule({
  imports: [
    CommonModule,
    OverviewRoutingModule,
    SharedModule,
    ConfirmPopupModule,
    MultiSelectModule
  ],
  declarations: [OverviewComponent],
})
export class OverviewModule { }
