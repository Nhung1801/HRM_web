import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ChartModule } from 'primeng/chart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TimesheetComponent } from './timesheet.component';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  imports: [
    CommonModule,
    OverlayPanelModule,
    TimesheetRoutingModule,
    SharedModule,
    ChartModule,
    MultiSelectModule
  ],
  declarations: [TimesheetComponent],
})
export class TimesheetModule { }
