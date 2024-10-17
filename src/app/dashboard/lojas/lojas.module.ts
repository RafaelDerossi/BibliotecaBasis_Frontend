import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { LojasRoutingModule } from './lojas-routing.module';
import { LojasComponent } from './lojas.component';
import { NovoEditarLojaComponent } from './novo-editar-loja/novo-editar-loja.component';


@NgModule({
  declarations: [
    LojasComponent,
    NovoEditarLojaComponent,
  ],
  imports: [
    CommonModule,
    LojasRoutingModule,
    SharedModule,
  ]
})
export class LojaModule { }
