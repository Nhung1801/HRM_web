import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimkeepingUnitCreateComponent } from './timkeeping-unit-create.component';
import { UnitCreateRoutingModule } from './unit-create-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';



@NgModule({
  declarations: [TimkeepingUnitCreateComponent],
  imports: [
    CommonModule,
    UnitCreateRoutingModule,
    SharedModule

  ]
})
export class UnitCreateModule { }
