import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeneralTimekeepComponent } from './general-timekeep.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: GeneralTimekeepComponent }])],
  exports: [RouterModule],
})
export class GeneralTimekeepRoutingModule { }
