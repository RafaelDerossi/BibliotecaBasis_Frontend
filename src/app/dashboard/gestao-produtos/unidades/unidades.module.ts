import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { UnidadesRoutingModule } from './unidades-routing.module';
import { UnidadesComponent } from './unidades.component';
import { NovoEditarUnidadeComponent } from './novo-editar-unidade/novo-editar-unidade.component';

@NgModule({
  declarations: [
    UnidadesComponent,
    NovoEditarUnidadeComponent
  ],
  imports: [
    CommonModule,
    UnidadesRoutingModule,
    SharedModule,
  ]
})
export class UnidadesModule { }
