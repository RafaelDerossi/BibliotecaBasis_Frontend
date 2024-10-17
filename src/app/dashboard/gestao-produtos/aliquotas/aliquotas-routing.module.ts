import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AliquotasComponent } from './aliquotas.component';

const routes: Routes = [
  {
    path: '',
    component: AliquotasComponent   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AliquotasRoutingModule { }
