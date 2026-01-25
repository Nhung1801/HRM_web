import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ChartModule } from 'primeng/chart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ContractListComponent } from './contract-list.component';
import { ContractListRoutingModule } from './contract-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    OverlayPanelModule,
    ContractListRoutingModule,
    SharedModule,
    ChartModule,
  ],
  declarations: [ContractListComponent],
})
export class ContractListModule { }
