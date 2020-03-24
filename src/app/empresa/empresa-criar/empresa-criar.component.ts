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

  constructor(private service: EmpresaMockService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.generateForm();
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
        new Array<UsuarioDTO>()
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
