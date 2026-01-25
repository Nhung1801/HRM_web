import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailComponent } from '../../profile/detail/detail.component';
import { DetailKpiComponent } from './detail-kpi.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: DetailKpiComponent }])],
  exports: [RouterModule],
})
export class DetailKpiRoutingModule { }
