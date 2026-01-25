import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryCompositionRoutingModule } from './salary-composition-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { SalaryCompositionComponent } from './salary-composition.component';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  declarations: [SalaryCompositionComponent],
  imports: [
    CommonModule,
    SalaryCompositionRoutingModule,
    SharedModule,
    AutoCompleteModule
  ]
})
export class SalaryCompositionModule { }
