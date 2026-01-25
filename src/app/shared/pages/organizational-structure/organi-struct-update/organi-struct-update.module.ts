import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrganiStructUpdateComponent } from './organi-struct-update.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrganiStructUpdateRoutingModule } from './organi-struct-update-routing.module';

@NgModule({
  declarations: [
    OrganiStructUpdateComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, 
    SharedModule,
    MultiSelectModule,
    OrganiStructUpdateRoutingModule
  ]
})
export class OrganiStructUpdateModule {}
