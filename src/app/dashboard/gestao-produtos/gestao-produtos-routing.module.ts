import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestaoProdutosComponent } from './gestao-produtos.component';

const routes: Routes = [
  {
    path: '',
    component: GestaoProdutosComponent,
    children:[
      {
        path:'',
        redirectTo: 'produtos',
        pathMatch: 'full',
      },
      {
        path: 'produtos',
        loadChildren: () => import('./produtos/produtos.module').then(module => module.ProdutosModule),        
        data: [{ claim: { nome: 'TipoUsuario', valor: '4'}}]
      },
      {
        path: 'grupos',
        loadChildren: () => import('./grupos/grupos.module').then(module => module.GruposModule),        
        data: [{ claim: { nome: 'TipoUsuario', valor: '4'}}]
      },
      {
        path: 'subgrupos',
        loadChildren: () => import('./subgrupos/subgrupos.module').then(module => module.SubgruposModule),        
        data: [{ claim: { nome: 'TipoUsuario', valor: '4'}}]
      },
      {
        path: 'fabricas',
        loadChildren: () => import('./fabricas/fabricas.module').then(module => module.FabricasModule),        
        data: [{ claim: { nome: 'TipoUsuario', valor: '4'}}]
      },
      {
        path: 'aliquotas',
        loadChildren: () => import('./aliquotas/aliquotas.module').then(module => module.AliquotasModule),        
        data: [{ claim: { nome: 'TipoUsuario', valor: '4'}}]
      },
      {
        path: 'unidades',
        loadChildren: () => import('./unidades/unidades.module').then(module => module.UnidadesModule),
        data: [{ claim: { nome: 'TipoUsuario', valor: '4'}}]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestaoProdutosRoutingModule { }
