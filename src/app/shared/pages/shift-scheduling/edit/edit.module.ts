import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditRoutingModule } from './edit-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { EditComponent } from './edit.component';

@NgModule({
    imports: [CommonModule, EditRoutingModule, SharedModule],
    declarations: [EditComponent],
})
export class EditModule {}
