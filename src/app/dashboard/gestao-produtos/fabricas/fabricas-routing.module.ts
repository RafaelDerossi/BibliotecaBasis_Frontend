import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FabricasComponent } from './fabricas.component';

const routes: Routes = [
  {
    path: '',
    component: FabricasComponent   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricasRoutingModule { }
