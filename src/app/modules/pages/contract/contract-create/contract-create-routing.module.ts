import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContractCreateComponent } from './contract-create.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ContractCreateComponent }]),
  ],
  exports: [RouterModule],
})
export class ContractCreateRoutingModule { }
