import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { AutorRoutingModule } from './autor-routing.module';
import { AutorComponent } from './autor.component';
import { NovoEditarAutorComponent } from './novo-editar-autor/novo-editar-autor.component';


@NgModule({
  declarations: [
    AutorComponent,
    NovoEditarAutorComponent,
  ],
  imports: [
    CommonModule,
    AutorRoutingModule,
    SharedModule,
  ]
})
export class AutorModule { }
