import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { EmpresaCriarComponent } from './empresa-criar/empresa-criar.component';
import { EmpresaEditarComponent } from './empresa-editar/empresa-editar.component';
import { EmpresaListarComponent } from './empresa-listar/empresa-listar.component';
import { EmpresaVerComponent } from './empresa-ver/empresa-ver.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: EmpresaListarComponent,
  },
  {
    path: "create",
    component: EmpresaCriarComponent,
  },
  {
    path: "editar/:id",
    component: EmpresaEditarComponent,
  },
  {
    path: "ver/:id",
    component: EmpresaVerComponent,
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
