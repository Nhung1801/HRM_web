import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TimkeepingUnitCreateComponent } from './timkeeping-unit-create.component';



@NgModule({
 exports:[RouterModule],
  imports: [
    RouterModule.forChild([{path:'', component:TimkeepingUnitCreateComponent}]),
    CommonModule
  ]
})
export class UnitCreateRoutingModule { }
