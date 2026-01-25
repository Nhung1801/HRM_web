import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContractUpdateComponent } from './contract-update.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ContractUpdateComponent }]),
  ],
  exports: [RouterModule],
})
export class ContractUpdateRoutingModule { }
