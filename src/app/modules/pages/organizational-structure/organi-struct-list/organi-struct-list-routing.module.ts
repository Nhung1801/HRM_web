import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganiStructListComponent } from './organi-struct-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: OrganiStructListComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class OrganiStructListRoutingModule { }
