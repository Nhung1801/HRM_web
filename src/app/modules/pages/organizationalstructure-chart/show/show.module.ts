import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ShowRoutingModule } from './show-routing.module';
import { ShowComponent } from './show.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShowComponent],
  imports: [
    CommonModule,
    SharedModule,
    ShowRoutingModule,
    OrganizationChartModule,
    FormsModule,
    SliderModule,
  ],
  
})
export class ShowModule { }
