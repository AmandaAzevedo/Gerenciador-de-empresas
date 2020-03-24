import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaMockService } from '../service/empresa.mock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaDTO } from '../models/empresaDTO.entity';
import { UsuarioDTO } from 'src/app/usuarios/models/usuarioDTO.entity';

@Component({
  selector: 'app-empresa-editar',
  templateUrl: './empresa-editar.component.html',
  styleUrls: ['./empresa-editar.component.css']
})
export class EmpresaEditarComponent implements OnInit {
  private formGroup: FormGroup;
  public empresa: EmpresaDTO;
  constructor(private service: EmpresaMockService, private formBuilder: FormBuilder, private route: Router, private router: ActivatedRoute) { }

  ngOnInit() {
    let id: number = +this.router.snapshot.params["id"];
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
        cnpj: [this.empresa.cnpj, [Validators.required]],
        razaoSocial: [this.empresa.razaoSocial, [Validators.required]],
        missao: [this.empresa.missao, [Validators.required]],
        visao: [this.empresa.visao, [Validators.required]],
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
            this.route.navigate(['/empresa']);
        }, err => {

        }
    );
  }

  onReset() {
    this.route.navigate(['/empresas']);
  }
}
