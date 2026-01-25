import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ChartModule } from 'primeng/chart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ExportPDFComponent } from './export-pdf.component';
import { ExportPdfRoutingModule } from './export-pdf-routing.module';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  imports: [
    CommonModule,
    OverlayPanelModule,
    ExportPdfRoutingModule,
    SharedModule,
    ChartModule,
    ConfirmPopupModule,
    MultiSelectModule
  ],
  declarations: [ExportPDFComponent],
})
export class ExportPdfModule { }
