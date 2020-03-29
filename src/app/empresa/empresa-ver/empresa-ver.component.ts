import { Component, OnInit } from '@angular/core';
import { EmpresaDTO } from '../models/empresaDTO.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaMockService } from '../service/empresa.mock.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsuarioMockService } from 'src/app/usuarios/service/usuariomock.service';
import { ValidateBrService } from 'angular-validate-br';

@Component({
  selector: 'app-empresa-ver',
  templateUrl: './empresa-ver.component.html',
  styleUrls: ['./empresa-ver.component.css']
})
export class EmpresaVerComponent implements OnInit {

  private formGroup: FormGroup;
  public empresa: EmpresaDTO;

  constructor(private route: ActivatedRoute, private service: EmpresaMockService, private formBuilder: FormBuilder, private router: Router, private usuariosService:UsuarioMockService, private validateBrService: ValidateBrService) { }

  ngOnInit() {
    let id: number = +this.route.snapshot.params["id"];
    this.service.getById(id).subscribe(empresa => {
      this.empresa = empresa;
      this.generateForm();
    })
  }

  get form() {
    return this.formGroup.controls;
  }

  generateForm() {
    this.formGroup = this.formBuilder.group(
      {
        nomeFantasia: [this.empresa.nomeFantasia, []],
        cnpj: [this.empresa.cnpj, []],
        razaoSocial: [this.empresa.razaoSocial, []],
        missao: [this.empresa.missao, []],
        visao: [this.empresa.visao, []],
        funcionarios: [this.empresa.funcionarios, []],
      }
    );
    this.deactiveForm();
  }

  deactiveForm(){
    this.formGroup.controls["nomeFantasia"].disable();
    this.formGroup.controls["cnpj"].disable();
    this.formGroup.controls["razaoSocial"].disable();
    this.formGroup.controls["missao"].disable();
    this.formGroup.controls["visao"].disable();
    this.formGroup.controls["funcionarios"].disable();
  }

}


