import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopupModule } from './popup.module';
import { PopupComponent } from './popup.component';
@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: PopupComponent }])],
    exports: [RouterModule],
})
export class PopupRoutingModule {}
