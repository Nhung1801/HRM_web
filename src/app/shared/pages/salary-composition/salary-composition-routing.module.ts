import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SalaryCompositionComponent } from './salary-composition.component';



@NgModule({
  exports:[RouterModule],
  imports: [
    RouterModule.forChild([{path: '', component: SalaryCompositionComponent}]),
    CommonModule
  ]
})
export class SalaryCompositionRoutingModule { }
