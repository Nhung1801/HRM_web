import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExportPDFComponent } from './export-pdf.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: ExportPDFComponent }])],
    exports: [RouterModule],
})
export class ExportPdfRoutingModule { }
