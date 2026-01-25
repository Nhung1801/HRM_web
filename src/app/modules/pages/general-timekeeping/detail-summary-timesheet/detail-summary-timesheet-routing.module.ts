import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailSummaryTimesheetComponent } from './detail-summary-timesheet.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: DetailSummaryTimesheetComponent }])],
    exports: [RouterModule],
})
export class DetailSummaryTimesheetRoutingModule { }
