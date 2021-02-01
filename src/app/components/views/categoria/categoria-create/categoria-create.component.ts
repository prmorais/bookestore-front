import { Component, OnInit } from '@angular/core';
import {CategoriaModel} from "../categoria.model";
import {CategoriaService} from "../categoria.service";
import {Router} from "@angular/router";
import {IError} from "../IError.interface";

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})

export class CategoriaCreateComponent implements OnInit {

  categoria: CategoriaModel = {
    nome: '',
    descricao: '',
  }

  constructor(private service: CategoriaService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void{
    this.service.create(this.categoria)
      .subscribe(data => {
        this.service.message(`Categoria "${data.nome.toUpperCase()}" criada com sucesso.`);
        // this.router.navigate(['categorias'])
        this.cancel();
      }, err => {
        for (let i = 0; i < err.error.errors.length; i++){
          this.service.message(err.error.errors[i].message);
        }
        // err.error.errors.map((msg: IError) => {
        //   this.service.message(msg.message)
        // });
      });
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }
}
