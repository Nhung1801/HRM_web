import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CommonContainerComponent } from './common-container/common-container.component';
import { GeneralRulesComponent } from './general-rules/general-rules.component';
import { AttendanceTrackingComponent } from './attendance-tracking/attendance-tracking.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { UtilityModule } from 'src/app/core/modules/utility/utility.module';
import { TimekeepingRoutingModule } from './timekeeping-routing.module';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedModule } from 'src/app/shared/modules/shared.module';
@NgModule({
    declarations: [CommonContainerComponent, GeneralRulesComponent, AttendanceTrackingComponent],
    imports: [
        CommonModule,
        TimekeepingRoutingModule,
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
        SharedModule,
        BreadcrumbModule,
        RadioButtonModule
    ],
})
export class TimekeepingModule {}
