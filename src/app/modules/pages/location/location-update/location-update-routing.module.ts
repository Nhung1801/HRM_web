import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationUpdateComponent } from './location-update.component';



@NgModule({
  exports: [RouterModule],
  imports: [
   RouterModule.forChild([{path:'', component:LocationUpdateComponent}])
  ]
})
export class LocationUpdateRoutingModule { }
