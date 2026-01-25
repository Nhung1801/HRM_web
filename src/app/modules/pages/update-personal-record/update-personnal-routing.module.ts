import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateCommonContainerComponent } from './update-common-container/update-common-container.component';

const routes: Routes = [
  {
    path:'',
    component:UpdateCommonContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatePersonnelRecordRoutingModule { }
