import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { FabricasRoutingModule } from './fabricas-routing.module';
import { FabricasComponent } from './fabricas.component';
import { NovoEditarFabricaComponent } from './novo-editar-fabrica/novo-editar-fabrica.component';

@NgModule({
  declarations: [
    FabricasComponent,
    NovoEditarFabricaComponent
  ],
  imports: [
    CommonModule,
    FabricasRoutingModule,
    SharedModule,
  ]
})
export class FabricasModule { }
