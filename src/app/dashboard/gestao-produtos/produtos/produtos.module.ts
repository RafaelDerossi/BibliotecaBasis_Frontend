import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos.component';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';
import { SobreProdutoComponent } from './detalhes-produto/sobre-produto/sobre-produto.component';

@NgModule({
  declarations: [
    ProdutosComponent,
    NovoProdutoComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    SharedModule,
  ]
})
export class ProdutosModule { }
