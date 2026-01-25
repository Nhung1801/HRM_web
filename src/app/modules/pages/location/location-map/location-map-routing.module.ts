import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationMapComponent } from './location-map.component';



@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild([{path:'', component:LocationMapComponent}])
  ]
})
export class LocationMapRoutingModule { }
