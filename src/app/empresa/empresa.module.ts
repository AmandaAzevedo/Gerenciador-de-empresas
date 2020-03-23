import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaCriarComponent } from './empresa-criar/empresa-criar.component';
import { EmpresaEditarComponent } from './empresa-editar/empresa-editar.component';
import { EmpresaListarComponent } from './empresa-listar/empresa-listar.component';
import { EmpresaMockService } from './service/empresa.mock.service';
import { EmpresaVerComponent } from './empresa-ver/empresa-ver.component';



@NgModule({
  declarations: [EmpresaCriarComponent, EmpresaEditarComponent, EmpresaListarComponent, EmpresaVerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmpresaRoutingModule
  ],
  providers: [
    {
      provide:EmpresaMockService, useClass: EmpresaMockService
    }
  ]
})
export class EmpresaModule { }
