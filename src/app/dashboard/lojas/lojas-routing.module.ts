import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LojasComponent } from './lojas.component';

const routes: Routes = [
  {
    path: '',
    component: LojasComponent,    
    data: [{ claim: { nome: 'TipoUsuario', valor: '4'}}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LojasRoutingModule { }
