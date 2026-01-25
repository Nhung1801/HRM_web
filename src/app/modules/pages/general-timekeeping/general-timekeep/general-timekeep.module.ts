import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ChartModule } from 'primeng/chart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { GeneralTimekeepComponent } from './general-timekeep.component';
import { GeneralTimekeepRoutingModule } from './general-timekeep-routing.module';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  imports: [
    CommonModule,
    OverlayPanelModule,
    GeneralTimekeepRoutingModule,
    SharedModule,
    ChartModule,
    MultiSelectModule
  ],
  declarations: [GeneralTimekeepComponent],
})
export class GeneralTimekeepModule { }
