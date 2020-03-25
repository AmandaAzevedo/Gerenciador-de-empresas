import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioMockService } from 'src/app/usuarios/service/usuariomock.service';
import { Router } from '@angular/router';
import { EmpresaDTO } from '../models/empresaDTO.entity';
import { UsuarioDTO } from 'src/app/usuarios/models/usuarioDTO.entity';
import { EmpresaMockService } from '../service/empresa.mock.service';

@Component({
  selector: 'app-empresa-criar',
  templateUrl: './empresa-criar.component.html',
  styleUrls: ['./empresa-criar.component.css']
})
export class EmpresaCriarComponent implements OnInit {
  private formGroup: FormGroup;
  public usuarios: Array<UsuarioDTO>;

  constructor(private service: EmpresaMockService, private formBuilder: FormBuilder, private route: Router, private usuariosService:UsuarioMockService) { }

  ngOnInit() {
    this.generateForm();
    this.usuariosService.list().subscribe(result => {
      console.log(result);
      this.usuarios = result;
    })
  }

  get form() {
    return this.formGroup.controls;
  }

  generateForm() {
    this.formGroup = this.formBuilder.group(
      {
        nomeFantasia: ['', [Validators.required]],
        cnpj: ['', [Validators.required]],
        razaoSocial: ['', [Validators.required]],
        missao: ['', [Validators.required]],
        visao: ['', [Validators.required]],
        funcionarios: ['', [Validators.required]],
      }
    );
  }

  onSubmit() {
    if(this.formGroup.invalid) {
      return;
    }

    const empresa: EmpresaDTO = new EmpresaDTO(
        null,
        this.formGroup.controls["nomeFantasia"].value,
        this.formGroup.controls["cnpj"].value,
        this.formGroup.controls["razaoSocial"].value,
        this.formGroup.controls["missao"].value,
        this.formGroup.controls["visao"].value,
        this.formGroup.controls["funcionarios"].value
    );

    this.service.insert(empresa).subscribe(
        result => {
            this.route.navigate(['/empresas']);
        }, err => {

        }
    );
  }

  onReset() {
    this.route.navigate(['/empresas']);
  }

}
