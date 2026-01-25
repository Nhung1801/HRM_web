import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { DepartmentReportsComponent } from './department-reports.component';
import { DepartmentReportsRoutingModule } from './department-reports-routing.module';
import { ChartModule } from 'primeng/chart';
import { SliderModule } from 'primeng/slider';

@NgModule({
  declarations: [DepartmentReportsComponent],
  imports: [
    CommonModule,
    SharedModule,
    DepartmentReportsRoutingModule,
    ChartModule,
    SliderModule
  ]
})
export class DepartmentReportsModule { }
