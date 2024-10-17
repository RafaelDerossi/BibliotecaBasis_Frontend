import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { AliquotasRoutingModule } from './aliquotas-routing.module';
import { AliquotasComponent } from './aliquotas.component';
import { NovoEditarAliquotaComponent } from './novo-editar-aliquota/novo-editar-aliquota.component';

@NgModule({
  declarations: [
    AliquotasComponent,
    NovoEditarAliquotaComponent
  ],
  imports: [
    CommonModule,
    AliquotasRoutingModule,
    SharedModule,
  ]
})
export class AliquotasModule { }
