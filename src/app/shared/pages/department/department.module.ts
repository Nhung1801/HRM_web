import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { WorkGroupListModule } from '../work-group/work-group-list/work-group-list.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { PopupApproveModule } from '../popup-approve/popup-approve.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        DepartmentRoutingModule,
        WorkGroupListModule,
        SharedModule,
        PopupApproveModule,
    ],
})
export class DepartmentModule {}
