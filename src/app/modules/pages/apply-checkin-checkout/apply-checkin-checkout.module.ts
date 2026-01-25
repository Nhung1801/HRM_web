import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ChipsModule } from 'primeng/chips';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ApplyCheckinCheckoutRoutingModule } from './apply-checkin-checkout-routing.module';
import { ApplyCheckinCheckoutComponent } from './apply-checkin-checkout.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';


@NgModule({
   imports: [
      ApplyCheckinCheckoutRoutingModule,
      SharedModule,
      ChipsModule,
      InputSwitchModule,
      FileUploadModule,
      ReactiveFormsModule,
      CheckboxModule,
      FormsModule,
      EditorModule,
      CommonModule,
      ButtonModule,
      RadioButtonModule,
      OverlayPanelModule
    ],
    declarations: [ApplyCheckinCheckoutComponent]
})
export class ApplyCheckinCheckoutModule { }
