import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(module => module.HomeModule)
      },
      {
        path: 'assunto',
        loadChildren: () => import('./assuntos/assunto.module').then(module => module.AssuntoModule),
      },
      {
        path: 'autor',
        loadChildren: () => import('./autores/autor.module').then(module => module.AutorModule),
      },
      {
        path: 'gestao-produtos',
        loadChildren: () => import('./gestao-produtos/gestao-produtos.module').then(module => module.GestaoProdutosModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
