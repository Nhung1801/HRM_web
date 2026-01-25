import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailedAttendanceComponent } from './detailed-attendance.component';


@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: DetailedAttendanceComponent }])],
  exports: [RouterModule],
})
export class DetailedAttendanceRoutingModule { }
