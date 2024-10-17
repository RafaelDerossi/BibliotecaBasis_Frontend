import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { GestaoProdutosRoutingModule } from './gestao-produtos-routing.module';
import { GestaoProdutosComponent } from './gestao-produtos.component';
import { NovoEditarGrupoComponent } from './grupos/novo-editar-grupo/novo-editar-grupo.component';


@NgModule({
  declarations: [
    GestaoProdutosComponent,
    NovoEditarGrupoComponent
  ],
  imports: [
    CommonModule,
    GestaoProdutosRoutingModule,
    SharedModule,
  ]
})
export class GestaoProdutosModule { }
