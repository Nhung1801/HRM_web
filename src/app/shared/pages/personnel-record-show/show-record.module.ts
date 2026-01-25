import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonnelRecordRoutingModule } from './show-record-routing.module';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { GeneralInformationComponent } from './general-information/general-information.component';
import { JobInformationComponent } from './job-information/job-information.component';
import { CommonContainerComponent } from './common-container/common-container.component';
import { UtilityModule } from 'src/app/core/modules/utility/utility.module';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [CommonContainerComponent,ContactInformationComponent,GeneralInformationComponent,JobInformationComponent],
  imports: [
    CommonModule,
    PersonnelRecordRoutingModule,
    UtilityModule,
    ToolbarModule,
    ButtonModule,
    DropdownModule,
    CheckboxModule,
    TableModule,
    DialogModule,
    CalendarModule,
    InputTextareaModule,
    InputTextModule
  ]
})
export class PersonnelRecordModule { }
