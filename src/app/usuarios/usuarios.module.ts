import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { UsuarioService } from './service/usuario.service';
import { UsuarioMockService } from './service/usuariomock.service';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioVerComponent } from './usuario-ver/usuario-ver.component';
import { UsuarioEditarComponent } from './usuario-editar/usuario-editar.component';
import { MatInputModule, MatTableModule, MatPaginator, MatPaginatorModule } from '@angular/material';



@NgModule({
  declarations: [UsuariosComponent, UsuariosListComponent, UsuarioCreateComponent, UsuarioVerComponent, UsuarioEditarComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [
      {
          provide: UsuarioService,
          useClass: UsuarioMockService
      },
  ]
})
export class UsuariosModule { }
