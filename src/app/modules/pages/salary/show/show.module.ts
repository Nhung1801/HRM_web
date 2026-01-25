import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show.component';
import { ShowRoutingModule } from './show-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TreeSelectModule } from 'primeng/treeselect';
import { CreateModule } from '../create/create.module';

@NgModule({
    imports: [
        CommonModule,
        ShowRoutingModule,
        SharedModule,
        ConfirmPopupModule,
        TreeSelectModule,
        CreateModule,
    ],
    declarations: [ShowComponent],
})
export class ShowModule {}
