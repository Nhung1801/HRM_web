import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationMapRoutingModule } from './location-map-routing.module';
import { LocationMapComponent } from './location-map.component';



@NgModule({
  declarations: [LocationMapComponent],
  imports: [
    CommonModule,
    LocationMapRoutingModule
  ],
  exports: [LocationMapComponent] 
})
export class LocationMapModule { }
