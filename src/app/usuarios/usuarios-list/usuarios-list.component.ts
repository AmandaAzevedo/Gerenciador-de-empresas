import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioDTO } from '../models/usuarioDTO.entity';
import { UsuarioMockService } from '../service/usuariomock.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
    selector: 'app-usuarios-list',
    templateUrl: './usuarios-list.component.html',
    styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {

    loading: boolean = true;
    users: Array<UsuarioDTO>;

    displayedColumns: string[] = ['id', 'name', 'email','acoes'];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    dataSource = null;

    constructor(private service: UsuarioMockService) { }

    ngOnInit() {
        this.list();
    }

    list() {
        this.loading = true;
        this.service.list().subscribe(
            res => {
                this.loading = false;
                this.users = res;
                this.dataSource = new MatTableDataSource<UsuarioDTO>(this.users);
            }, err => {
                console.log(err);
            }
        );
    }

    delete(id: number) {
        this.service.delete(id).subscribe(
            res => {
                this.list();
            }, err => {
                console.log(err)
            }
        );
        return false;
    }

}
