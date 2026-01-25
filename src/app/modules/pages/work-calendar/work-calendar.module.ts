import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ChartModule } from 'primeng/chart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MultiSelectModule } from 'primeng/multiselect';
import { WorkCalendarRoutingModule } from './work-calendar-routing.module';
import { WorkCalendarComponent } from './work-calendar.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayPanelModule,
    WorkCalendarRoutingModule,
    SharedModule,
    ChartModule,
    MultiSelectModule
  ],
  declarations: [WorkCalendarComponent],
})
export class WorkCalendarModule { }
