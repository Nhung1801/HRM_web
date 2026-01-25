import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonContainerComponent } from './common-container/common-container.component';

const routes: Routes = [
  {
    path:'',
    component:CommonContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelRecordRoutingModule { }
