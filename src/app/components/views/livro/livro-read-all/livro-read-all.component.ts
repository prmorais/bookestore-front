import { Component, OnInit } from '@angular/core';
import {LivroModel} from "../livro.model";
import {ActivatedRoute, Router} from "@angular/router";
import {LivroService} from "../livro.service";

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  id_cat: String = '';
  load: boolean = false;
  livros: LivroModel[] = [];
  displayedColumns: string[] = ['id', 'titulo', 'nome_autor', 'livros', 'acoes'];

  constructor(
    private service: LivroService,
    private activatedRoute: ActivatedRoute,
    private route: Router) { }

  ngOnInit(): void {

    this.id_cat = this.activatedRoute.snapshot.params.id_cat;
    this.findLivrosByCategoria();
  }

  findLivrosByCategoria(): void {
    this.id_cat &&
    this.service.findLivrosByCategoria(this.id_cat)
      .subscribe(data => {
        this.livros = data;
        this.load = true;
      }, error => console.log(error));
  };

  adicionarLivro(): void {
    this.route.navigate([`categorias/${this.id_cat}/livros/create`]);
  }
}
