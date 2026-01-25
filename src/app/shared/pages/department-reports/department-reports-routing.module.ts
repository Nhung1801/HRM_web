import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DepartmentReportsComponent } from './department-reports.component';



@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild([{path:'', component: DepartmentReportsComponent}]),
    CommonModule
  ]
})
export class DepartmentReportsRoutingModule { }
