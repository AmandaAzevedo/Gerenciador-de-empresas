import { Injectable } from '@angular/core';
import { IUsuarioService } from './iusuario.service';
import { UsuarioDTO } from '../models/usuarioDTO.entity';
import { Observable, observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuarioMockService implements IUsuarioService {

    usuarios: UsuarioDTO[] = [
        new UsuarioDTO(1, "Gustavo Maciel", "gustavo@mail.com"),
        new UsuarioDTO(2, "Vinnicius", "vinnicius@mail.com"),
    ]

    lastId: number = 2;

    list(): Observable<Array<UsuarioDTO>> {
        return new Observable<Array<UsuarioDTO>>(
            (obs) => {
                obs.next(this.usuarios);
                obs.complete();
            }
        );
    }

    getById(id: number): Observable<UsuarioDTO> {
        let usuarioDTO: Observable<UsuarioDTO> = null;
        console.log(this.usuarios);
        this.usuarios.forEach(element => {
            if(element.id == id){
                usuarioDTO = new Observable<UsuarioDTO>(obs=>{
                    obs.next(element);
                    obs.complete();
                });
            }
        });
        return usuarioDTO;
    }

    insert(usuario: UsuarioDTO): Observable<UsuarioDTO> {
        usuario.id = ++this.lastId;
        this.usuarios.push(usuario);
        return new Observable<any> (
            (obs) => {
                obs.next(usuario);
                obs.complete();
            }
        );
    }

    delete(id: number): Observable<any> {
        const aux: UsuarioDTO[] = []
        this.usuarios.forEach((user) => {
            if(user.id != id) {
                aux.push(user);
            }
        });
        this.usuarios = aux;
        return new Observable<any>(
            (obs) => {
                obs.next(true);
                obs.complete();
            }
        );
    }

    update(usuario: UsuarioDTO): Observable<UsuarioDTO>{

        let aux: Observable<UsuarioDTO> = null;

        this.usuarios.forEach(element => {
            if (element.id == usuario.id){
                element.name = usuario.name;
                element.email = usuario.email;
                aux = new Observable<UsuarioDTO>(obs => {
                    obs.next(element);
                });
            }
        });
        return aux;
    }

    constructor() { }
}
