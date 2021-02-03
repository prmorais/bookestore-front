import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LivroModel} from "../livro.model";
import {LivroService} from "../livro.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  // titulo = new FormControl('', [Validators.minLength(5)]);
  // nome_autor = new FormControl('', [Validators.minLength(5)]);
  // texto = new FormControl('', [Validators.minLength(10)]);

  livro: LivroModel = {
    titulo: '',
    nome_autor: '',
    texto: '',
  }

  id_cat: string = '';
  formulario: FormGroup = new FormGroup({});

  constructor(
    private service: LivroService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.id_cat = this.activatedRoute.snapshot.params.id_cat;
    this.criarFormulario();
  };

  criarFormulario() {
    this.formulario = this.fb.group({
      titulo: [null, [Validators.required, Validators.minLength(5)]],
      nome_autor: [null, [Validators.required, Validators.minLength(5)]],
      texto: [null, [Validators.required, Validators.minLength(10)]],
    });
  }

  create(): void {
    this.service.create(this.id_cat, this.formulario.value)
      .subscribe(data => {
        this.livro = data;
        this.service.message(`Livro ${this.livro.titulo.toUpperCase()} adicionado com sucesso`);
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

  verificaValidTouched(campo: string) {
    return !this.formulario.controls[campo].valid && this.formulario.controls[campo].touched;
  };

  errorRequired(campo: string) {
    switch (campo) {
      case 'nome_autor':
        return 'Nome do autor é obrigatório!';
      default:
        return `${campo.charAt(0).toUpperCase()}${campo.slice(1)} é obrigatório!`;
    }
  }

  errorMinLength(campo: string) {
    switch (campo) {
      case 'nome_autor':
        return `Nome do autor é deve ter no mínimo 5 caracteres!`;
      case 'texto':
        return `${campo.charAt(0).toUpperCase()}${campo.slice( 1)} deve ter ter no mínimo 10 caracteres!`;
      default:
        return `${campo.charAt(0).toUpperCase()}${campo.slice( 1)} deve ter ter no mínimo 5 caracteres!`;
    }
  }

  getMessage(campo: string): string {

    let campoVerifica = this.formulario.controls[campo];
    let msg: string = '';

    if (campoVerifica.touched) {
      campoVerifica.errors &&
      Object.keys(campoVerifica.errors).map(error => {
        if (error === 'required'){
          msg = this.errorRequired(campo);
        }

        if (error === 'minlength')
        msg = this.errorMinLength(campo);
      });
    }
    return msg;
  }
}
