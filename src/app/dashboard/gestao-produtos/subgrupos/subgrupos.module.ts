import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { SubgruposRoutingModule } from './subgrupos-routing.module';
import { SubgruposComponent } from './subgrupos.component';

@NgModule({
  declarations: [
    SubgruposComponent,    
  ],
  imports: [
    CommonModule,
    SubgruposRoutingModule,
    SharedModule,
  ]
})
export class SubgruposModule { }
