import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationCreateComponent } from './location-create.component';



@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild([{path:'', component:LocationCreateComponent}]),
   
  ]
})
export class LocationCreateRoutingModule { }
