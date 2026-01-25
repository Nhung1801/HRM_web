import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TimkeepingUnitUpdateComponent } from './timkeeping-unit-update.component';



@NgModule({
  exports:[RouterModule],
  imports: [
    RouterModule.forChild([{path:'', component: TimkeepingUnitUpdateComponent}]),
    CommonModule
  ]
})
export class UnitUpdateRoutingModule { }
