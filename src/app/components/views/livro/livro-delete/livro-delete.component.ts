import { Component, OnInit } from '@angular/core';
import {LivroModel} from "../livro.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LivroService} from "../livro.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {
  livro: LivroModel = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: '',
  };

  id_cat: string = '';
  formulario: FormGroup = new FormGroup({});
  load: boolean = false;

  constructor(
    private service: LivroService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {
  };

  ngOnInit(): void {
    this.id_cat = this.activatedRoute.snapshot.params.id_cat;
    this.livro.id = this.activatedRoute.snapshot.params.id;
    this.criarFormulario();
    this.findLivroById();
  };

  criarFormulario() {
    this.formulario = this.fb.group({
      id: null,
      titulo: [null, [Validators.required, Validators.minLength(5)]],
      nome_autor: [null, [Validators.required, Validators.minLength(5)]],
      texto: [null, [Validators.required, Validators.minLength(10)]],
    });
    this.formulario.disable();
  };

  findLivroById(): void {
    this.livro.id &&
    this.service.findLivroById(this.livro.id)
      .subscribe(data => {
        this.livro = data;
        this.formulario.patchValue(this.livro);
        this.load = true;
      });
  };

  delete(): void {
    this.livro.id &&
    this.service.delete(this.livro.id)
      .subscribe(() => {
        this.service.message(`Livro ${this.livro.titulo.toUpperCase()} removido com sucesso`);
        this.cancel();
      }, () => {
          this.service.message('Ocorreu um erro ao remover livro. Tente mais tarde.');
      });
  };

  cancel(): void {
    this.route.navigate([`categorias/${this.id_cat}/livros`]);
  };
}
