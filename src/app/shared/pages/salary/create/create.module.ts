import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CreateRoutingModule } from './create-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CreateComponent } from './create.component';
import { UtilityModule } from 'src/app/core/modules/utility/utility.module';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    declarations: [CreateComponent],
    imports: [
        CommonModule,
        CreateRoutingModule,
        SharedModule,
        BreadcrumbModule,
        UtilityModule,
        MultiSelectModule,
    ],
    exports: [CreateComponent],
})
export class CreateModule {}
