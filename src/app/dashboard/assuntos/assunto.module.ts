import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { AssuntoRoutingModule } from './assunto-routing.module';
import { AssuntoComponent } from './assunto.component';
import { NovoEditarAssuntoComponent } from './novo-editar-assunto/novo-editar-assunto.component';


@NgModule({
  declarations: [
    AssuntoComponent,
    NovoEditarAssuntoComponent,
  ],
  imports: [
    CommonModule,
    AssuntoRoutingModule,
    SharedModule,
  ]
})
export class AssuntoModule { }
