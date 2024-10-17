import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule as HomeRoutingModule } from './home-routing.module';
import { HomeComponent as HomeComponent } from './home.component';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { RouterModule } from '@angular/router';
import { DetalhesProdutoComponent } from '../gestao-produtos/produtos/detalhes-produto/detalhes-produto.component';
import { SobreProdutoComponent } from '../gestao-produtos/produtos/detalhes-produto/sobre-produto/sobre-produto.component';
import { SobreProdutoEstoqueComponent } from '../gestao-produtos/produtos/detalhes-produto/sobre-produto-estoque/sobre-produto-estoque.component';
import { SobreProdutoPrecoComponent } from '../gestao-produtos/produtos/detalhes-produto/sobre-produto-preco/sobre-produto-preco.component';
import { SobreProdutoAplicacaoComponent } from '../gestao-produtos/produtos/detalhes-produto/sobre-produto-aplicacao/sobre-produto-aplicacao.component';
import { SobreProdutoTributacaoComponent } from '../gestao-produtos/produtos/detalhes-produto/sobre-produto-tributacao/sobre-produto-tributacao.component';
import { SobreProdutoGaleriaComponent } from '../gestao-produtos/produtos/detalhes-produto/sobre-produto-galeria/sobre-produto-galeria.component';
import { SobreProdutoOutrosDadosComponent } from '../gestao-produtos/produtos/detalhes-produto/sobre-produto-outros-dados/sobre-produto-outros-dados.component';

@NgModule({
  declarations: [
    HomeComponent, 
    DetalhesProdutoComponent ,
    SobreProdutoComponent,
    SobreProdutoEstoqueComponent,
    SobreProdutoPrecoComponent,
    SobreProdutoAplicacaoComponent,
    SobreProdutoTributacaoComponent,
    SobreProdutoGaleriaComponent,
    SobreProdutoOutrosDadosComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
