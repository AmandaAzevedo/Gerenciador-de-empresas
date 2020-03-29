import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpresaDTO } from '../models/empresaDTO.entity';
import { EmpresaMockService } from '../service/empresa.mock.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-empresa-listar',
  templateUrl: './empresa-listar.component.html',
  styleUrls: ['./empresa-listar.component.css']
})
export class EmpresaListarComponent implements OnInit {

  loading: boolean = true;
  empresas: Array<EmpresaDTO>;

  displayedColumns: string[] = ['id', 'cnpj', 'nomeFantasia', 'razaoSocial', 'missao', 'visao','acoes'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = null;

  constructor(private service: EmpresaMockService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.loading = true;
    this.service.list().subscribe(
      res => {
        this.loading = false;
        this.empresas = res;
        this.dataSource = new MatTableDataSource<EmpresaDTO>(this.empresas);
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
