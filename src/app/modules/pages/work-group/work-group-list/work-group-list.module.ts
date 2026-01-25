import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { WorkGroupListRoutingModule } from './work-group-list-routing.module';
import { WorkGroupListComponent } from './work-group-list.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import {
    CdkDragDrop,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import { PopupModule } from '../../popup/popup/popup.module';
@NgModule({
    declarations: [WorkGroupListComponent],
    imports: [
        CommonModule,
        SharedModule,
        WorkGroupListRoutingModule,
        ColorPickerModule,
        CdkDropListGroup,
        CdkDropList,
        CdkDrag,
        PopupModule
    ],
    exports: [WorkGroupListComponent],
})
export class WorkGroupListModule {}
