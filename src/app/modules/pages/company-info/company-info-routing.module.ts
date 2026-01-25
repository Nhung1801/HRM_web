import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompanyInfoComponent } from './company-info.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: CompanyInfoComponent }]),
  ],
  exports: [RouterModule],
})
export class CompanyInfoRoutingModule { }
