import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApplyCheckinCheckoutComponent } from './apply-checkin-checkout.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ApplyCheckinCheckoutComponent }]),
  ],
  exports: [RouterModule],
})
export class ApplyCheckinCheckoutRoutingModule { }
