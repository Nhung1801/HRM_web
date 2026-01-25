import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { DetailRoutingModule } from './detail-routing.module';

@NgModule({
    imports: [CommonModule, DetailRoutingModule, SharedModule],
    declarations: [DetailComponent],
})
export class DetailModule {}
