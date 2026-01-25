import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create.component';
@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: CreateComponent }]),
    ],
    exports: [RouterModule],
})
export class CreateRoutingModule {}
