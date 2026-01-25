import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateGeneralInformationComponent } from './update-general-information/update-general-information.component';
import { UpdateCommonContainerComponent } from './update-common-container/update-common-container.component';
import { UpdateContactInformationComponent } from './update-contact-information/update-contact-information.component';
import { UpdateJobInformationComponent } from './update-job-information/update-job-information.component';
import { UpdatePersonnelRecordRoutingModule } from './update-personnal-routing.module';
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
    declarations: [
        UpdateCommonContainerComponent,
        UpdateContactInformationComponent,
        UpdateJobInformationComponent,
        UpdateGeneralInformationComponent,
    ],
    imports: [
        UpdatePersonnelRecordRoutingModule,
        CommonModule,
        UtilityModule,
        ToolbarModule,
        ButtonModule,
        DropdownModule,
        CheckboxModule,
        TableModule,
        DialogModule,
        CalendarModule,
        InputTextareaModule,
        InputTextModule,
    ],
})
export class UpdatePersonnalRecordModule {}
