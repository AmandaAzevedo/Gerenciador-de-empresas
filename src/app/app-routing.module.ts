import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: 'main',
        redirectTo: './main/main.module#MainModule',
        pathMatch: 'full',
    },
    {
        path: 'usuarios',
        loadChildren: './usuarios/usuarios.module#UsuariosModule',
    },
    {
        path: 'empresa',
        loadChildren: './empresa/empresa.module#EmpresaModule',
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
