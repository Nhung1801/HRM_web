import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationCreateComponent } from './location-create.component';
import { LocationCreateRoutingModule } from './location-create-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { LocationMapModule } from '../location-map/location-map.module';


@NgModule({
  declarations: [LocationCreateComponent],
  imports: [
    CommonModule,
    LocationCreateRoutingModule,
    SharedModule,
    LocationMapModule,
  ]
})
export class LocationCreateModule { }
