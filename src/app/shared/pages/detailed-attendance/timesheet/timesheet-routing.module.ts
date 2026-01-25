import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimesheetComponent } from './timesheet.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: TimesheetComponent }])],
  exports: [RouterModule],
})
export class TimesheetRoutingModule { }
