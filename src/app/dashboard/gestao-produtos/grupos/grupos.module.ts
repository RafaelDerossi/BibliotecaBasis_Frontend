import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { GruposRoutingModule } from './grupos-routing.module';
import { GruposComponent } from './grupos.component';

@NgModule({
  declarations: [
    GruposComponent,    
  ],
  imports: [
    CommonModule,
    GruposRoutingModule,
    SharedModule,
  ]
})
export class GruposModule { }
