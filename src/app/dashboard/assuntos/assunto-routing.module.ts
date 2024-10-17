import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssuntoComponent } from './assunto.component';

const routes: Routes = [
  {
    path: '',
    component: AssuntoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssuntoRoutingModule { }
