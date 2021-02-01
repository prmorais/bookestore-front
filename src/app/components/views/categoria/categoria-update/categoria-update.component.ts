import { Component, OnInit } from '@angular/core';
import {CategoriaModel} from "../categoria.model";
import {CategoriaService} from "../categoria.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

  categoria: CategoriaModel = {
    id: '',
    nome: '',
    descricao: ''
  }

  load: Boolean = false;

  constructor(
    private service: CategoriaService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoria.id = this.activateRoute.snapshot.params.id;
    this.findCategoriaById();
  };

  findCategoriaById(): void {
    this.categoria.id &&
    this.service.findCategoriaById(this.categoria.id)
      .subscribe(data => {
        this.categoria = data;
        this.load = true;
      });
  };

  update(): void {
    this.categoria.id &&
    this.service.update(this.categoria)
      .subscribe(data => {
        this.categoria = data;
        this.service.message(`Categoria "${data.nome.toUpperCase()}" atualizada com sucesso.`);
        this.cancel();
      }, err => {
        for (let i = 0; i < err.error.errors.length; i++) {
          this.service.message(err.error.errors[i].message);
        }
      });
  };

  cancel(): void {
    this.router.navigate(['categorias']);
  }

}
