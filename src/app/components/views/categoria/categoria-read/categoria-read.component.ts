import { Component, OnInit } from '@angular/core';
import {CategoriaModel} from "../categoria.model";
import {CategoriaService} from "../categoria.service";

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros', 'acoes'];
  categorias: CategoriaModel[] = [];
  load: boolean = false;

  constructor(private service: CategoriaService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAllCategorias()
      .subscribe((data => {
        this.categorias = data;
        this.load = true;
      }))
  }

}
