import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaMockService } from '../service/empresa.mock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaDTO } from '../models/empresaDTO.entity';
import { UsuarioDTO } from 'src/app/usuarios/models/usuarioDTO.entity';
import { UsuarioMockService } from 'src/app/usuarios/service/usuariomock.service';
import { ValidateBrService } from 'angular-validate-br';

@Component({
  selector: 'app-empresa-editar',
  templateUrl: './empresa-editar.component.html',
  styleUrls: ['./empresa-editar.component.css']
})
export class EmpresaEditarComponent implements OnInit {
  private formGroup: FormGroup;
  public empresa: EmpresaDTO;
  public usuarios: Array<UsuarioDTO>;
  private submitted: boolean = false;

  constructor(private service: EmpresaMockService, private formBuilder: FormBuilder, private route: Router, private router: ActivatedRoute, private usuariosService:UsuarioMockService, private validateBrService: ValidateBrService) { }

  ngOnInit() {
    let id: number = +this.router.snapshot.params["id"];
    this.usuariosService.list().subscribe(result => {
      this.usuarios = result;
    })
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
        nomeFantasia: [this.empresa.nomeFantasia, [Validators.required]],
        cnpj: [this.empresa.cnpj, [Validators.required, this.validateBrService.cnpj]],
        razaoSocial: [this.empresa.razaoSocial, [Validators.required]],
        missao: [this.empresa.missao, [Validators.required]],
        visao: [this.empresa.visao, [Validators.required]],
        funcionarios: [this.empresa.funcionarios, [Validators.required]],
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if(this.formGroup.invalid) {
      return;
    }

    const empresa: EmpresaDTO = new EmpresaDTO(
        this.empresa.id,
        this.formGroup.controls["cnpj"].value,
        this.formGroup.controls["nomeFantasia"].value,
        this.formGroup.controls["razaoSocial"].value,
        this.formGroup.controls["missao"].value,
        this.formGroup.controls["visao"].value,
        this.formGroup.controls["funcionarios"].value,
    );

    this.service.update(empresa).subscribe(
        result => {
            this.route.navigate(['/empresas']);
        }, err => {

        }
    );
  }

  onReset() {
    this.submitted = false;
    this.route.navigate(['/empresas']);
  }

  hasError(controlName: string, errorName: string) {
    return this.formGroup.controls[controlName].hasError(errorName) && this.formGroup.controls[controlName].touched;
  }
}
