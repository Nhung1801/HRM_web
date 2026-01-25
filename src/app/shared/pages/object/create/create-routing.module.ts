import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateModule } from './create.module';
import { CreateComponent } from './create.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: CreateComponent }]),
    ],
    exports: [RouterModule],
})
export class CreateRoutingModule {}
