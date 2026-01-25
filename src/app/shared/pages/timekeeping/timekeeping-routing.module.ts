import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonContainerComponent } from './common-container/common-container.component';
import { RouterModule, Routes } from '@angular/router';


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
export class TimekeepingRoutingModule { }
