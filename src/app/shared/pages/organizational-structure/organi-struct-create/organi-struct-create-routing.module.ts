import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrganiStructCreateComponent } from './organi-struct-create.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{ path: '', component: OrganiStructCreateComponent }]),
],
exports: [RouterModule],
})
export class OrganiStructCreateRoutingModule { }
