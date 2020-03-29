import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioMockService } from '../service/usuariomock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioDTO } from '../models/usuarioDTO.entity';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css']
})
export class UsuarioEditarComponent implements OnInit {

  private formGroup: FormGroup;
  private usuario: UsuarioDTO;

  constructor(private service: UsuarioMockService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let id: number = +this.route.snapshot.params["id"];
    this.service.getById(id).subscribe(usuario => {
      this.usuario = usuario;
      this.generateForm();
    })
  }

  get form() {
    return this.formGroup.controls;
  }

  generateForm() {
    this.formGroup = this.formBuilder.group(
      {
        name: [this.usuario.name, [Validators.required]],
        email: [this.usuario.email, [Validators.email, Validators.required]],
      }
    );
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    const user: UsuarioDTO = new UsuarioDTO(
      this.usuario.id,
      this.formGroup.controls["name"].value,
      this.formGroup.controls["email"].value,
    );

    this.service.update(user).subscribe(
      result => {
        this.router.navigate(['/usuarios']);
      }, err => {

      }
    );
  }

  onReset() {
    this.router.navigate(['/usuarios']);
  }

  hasError(controlName: string, errorName: string) {
    return this.formGroup.controls[controlName].hasError(errorName) && this.formGroup.controls[controlName].touched;
  }
}