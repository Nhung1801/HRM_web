import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrganiStructCreateRoutingModule } from './organi-struct-create-routing.module';
import { OrganiStructCreateComponent } from './organi-struct-create.component';

@NgModule({
  
  imports: [
   
    CommonModule, 
    OrganiStructCreateRoutingModule, 
    SharedModule,
    MultiSelectModule
  ],
  declarations: [OrganiStructCreateComponent],
})
export class OrganiStructCreateModule { }
