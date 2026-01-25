import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PopupApproveComponent } from './popup-approve.component';



@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild([{ path: '', component: PopupApproveComponent }]),
    CommonModule
  ]
})
export class PopupApproveRoutingModule { }
export {PopupApproveComponent}