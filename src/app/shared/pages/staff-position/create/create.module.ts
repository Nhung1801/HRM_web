import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { CreateRoutingModule } from './create-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    imports: [
        CommonModule,
        CreateRoutingModule,
        SharedModule,
        MultiSelectModule,
    ],
    declarations: [CreateComponent],
})
export class CreateModule {}
