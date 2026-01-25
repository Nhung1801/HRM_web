import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitUpdateRoutingModule } from './unit-update-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { TimkeepingUnitUpdateComponent } from './timkeeping-unit-update.component';



@NgModule({
  declarations: [TimkeepingUnitUpdateComponent],
  imports: [
    CommonModule,
    UnitUpdateRoutingModule,
    SharedModule
  ]
})
export class UnitUpdateModule { }
