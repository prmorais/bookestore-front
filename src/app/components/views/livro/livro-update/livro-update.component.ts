import { Component, OnInit } from '@angular/core';
import {LivroModel} from "../livro.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LivroService} from "../livro.service";
import {ActivatedRoute, Router} from "@angular/router";

import {validaCampos, validaCampoTouched} from '../utils';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {
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
  };

  findLivroById(): void {
    this.livro.id &&
    this.service.findLivroById(this.livro.id)
      .subscribe(data => {
        this.formulario.patchValue(data);
        this.load = true;
      });
  };

  update(): void {
    this.livro.id &&
    this.service.update(this.formulario.value)
      .subscribe(data => {
        this.livro = data;
        this.service.message(`Livro ${this.livro.titulo.toUpperCase()} atualizado com sucesso`);
        this.cancel();
      }, err => {
        for (let i = 0; i < err.error.errors.length; i++) {
          this.service.message(err.error.errors[i].message);
        }
      });
  };

  cancel(): void {
    this.route.navigate([`categorias/${this.id_cat}/livros`]);
  };

  // Métodos para a validação dos campos do formulário
  verificaValidTouched(campo: string) {
    return validaCampoTouched(campo, this.formulario);
  };

  getMessage(campo: string): string {
    return validaCampos(campo, this.formulario);
  }
}
