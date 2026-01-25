import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WorkGroupListComponent } from './work-group-list.component';



@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild([{path:'', component: WorkGroupListComponent}]),
    CommonModule
  ]
})
export class WorkGroupListRoutingModule { }
