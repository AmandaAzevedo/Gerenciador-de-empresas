import { Routes, RouterModule } from "@angular/router";
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NgModule } from '@angular/core';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioVerComponent } from './usuario-ver/usuario-ver.component';
import { UsuarioEditarComponent } from './usuario-editar/usuario-editar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
      path: 'list',
      component: UsuariosListComponent,
  },
  {
      path: "create",
      component: UsuarioCreateComponent,
  },
  {
      path: "ver/:id",
      component: UsuarioVerComponent,
  },
  {
      path: "editar/:id",
      component: UsuarioEditarComponent,
  }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }
