import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ChartModule } from 'primeng/chart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MultiSelectModule } from 'primeng/multiselect';
import { DetailSummaryTimesheetComponent } from './detail-summary-timesheet.component';
import { DetailSummaryTimesheetRoutingModule } from './detail-summary-timesheet-routing.module';

@NgModule({
  imports: [
      CommonModule,
      OverlayPanelModule,
      DetailSummaryTimesheetRoutingModule,
      SharedModule,
      ChartModule,
      MultiSelectModule
    ],
    declarations: [DetailSummaryTimesheetComponent],
})
export class DetailSummaryTimesheetModule { }
