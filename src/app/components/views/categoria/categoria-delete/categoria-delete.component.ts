import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriaService} from "../categoria.service";
import {CategoriaModel} from "../categoria.model";

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  categoria: CategoriaModel = {
    id: '',
    nome: '',
    descricao: ''
  }

  load: boolean = false;

  constructor(private service: CategoriaService,
              private router: Router,
              private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoria.id = this.activateRouter.snapshot.params.id;
    this.findCategoriaById();
  }

  findCategoriaById(): void {
    this.categoria.id &&
    this.service.findCategoriaById(this.categoria.id)
      .subscribe(data => {
        this.categoria = data;
        this.load = true;
      })
  }

  remover(): void {
    this.categoria.id &&
      this.service.delete(this.categoria.id)
        .subscribe(() => {
          this.service.message(`Categoria "${this.categoria.nome.toUpperCase()}" removida com sucesso!`)
          this.cancel();
        }, err => {
          this.service.message(err.error.error);
        });
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }
}
