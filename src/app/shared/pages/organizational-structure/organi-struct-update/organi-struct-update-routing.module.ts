import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganiStructUpdateComponent } from './organi-struct-update.component';


@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: OrganiStructUpdateComponent }]),
],
  exports :[RouterModule]
})
export class OrganiStructUpdateRoutingModule { }
