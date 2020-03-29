import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioMockService } from 'src/app/usuarios/service/usuariomock.service';
import { Router } from '@angular/router';
import { EmpresaDTO } from '../models/empresaDTO.entity';
import { UsuarioDTO } from 'src/app/usuarios/models/usuarioDTO.entity';
import { EmpresaMockService } from '../service/empresa.mock.service';
import { ValidateBrService } from 'angular-validate-br';

@Component({
  selector: 'app-empresa-criar',
  templateUrl: './empresa-criar.component.html',
  styleUrls: ['./empresa-criar.component.css']
})
export class EmpresaCriarComponent implements OnInit {
  private formGroup: FormGroup;
  public usuarios: Array<UsuarioDTO>;
  private submitted: boolean = false;

  constructor(private service: EmpresaMockService, private formBuilder: FormBuilder, private route: Router, private usuariosService: UsuarioMockService, private validateBrService: ValidateBrService) { }

  ngOnInit() {
    this.generateForm();
    this.usuariosService.list().subscribe(result => {
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
        cnpj: ['', [Validators.required, this.validateBrService.cnpj]],
        razaoSocial: ['', [Validators.required]],
        missao: ['', [Validators.required]],
        visao: ['', [Validators.required]],
        funcionarios: ['', [Validators.required]],
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }

    const empresa: EmpresaDTO = new EmpresaDTO(
      null,
      this.formGroup.controls["cnpj"].value,
      this.formGroup.controls["nomeFantasia"].value,
      this.formGroup.controls["razaoSocial"].value,
      this.formGroup.controls["missao"].value,
      this.formGroup.controls["visao"].value,
      this.formGroup.controls["funcionarios"].value,
    );

    this.service.insert(empresa).subscribe(
      result => {
        this.route.navigate(['/empresas']);
      }, err => {

      }
    );
  }

  onReset() {
    this.submitted = false;
  }

  hasError(controlName: string, errorName: string) {
    return this.formGroup.controls[controlName].hasError(errorName) && this.formGroup.controls[controlName].touched;
  }

}
