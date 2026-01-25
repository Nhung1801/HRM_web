import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationUpdateRoutingModule } from './location-update-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { LocationUpdateComponent } from './location-update.component';



@NgModule({
  declarations: [LocationUpdateComponent],
  imports: [
    CommonModule,
    LocationUpdateRoutingModule,
    SharedModule
  ]
})
export class LocationUpdateModule { }
