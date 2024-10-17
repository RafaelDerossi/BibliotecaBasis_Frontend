import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { LivroRoutingModule } from './livro-routing.module';
import { LivroComponent } from './livro.component';
import { NovoEditarLivroComponent } from './novo-editar-livro/novo-editar-livro.component';


@NgModule({
  declarations: [
    LivroComponent,
    NovoEditarLivroComponent,
  ],
  imports: [
    CommonModule,
    LivroRoutingModule,
    SharedModule,
  ]
})
export class LivroModule { }
