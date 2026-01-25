import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkCalendarComponent } from './work-calendar.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: WorkCalendarComponent }])],
  exports: [RouterModule],
})
export class WorkCalendarRoutingModule { }
