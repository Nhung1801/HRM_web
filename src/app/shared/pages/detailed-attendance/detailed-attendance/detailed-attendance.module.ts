import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ChartModule } from 'primeng/chart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DetailedAttendanceComponent } from './detailed-attendance.component';
import { DetailedAttendanceRoutingModule } from './detailed-attendance-routing.module';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  imports: [
     CommonModule,
     OverlayPanelModule,
     DetailedAttendanceRoutingModule,
     SharedModule,
     ChartModule,
     MultiSelectModule
   ],
   declarations: [DetailedAttendanceComponent],
})
export class DetailedAttendanceModule { }
