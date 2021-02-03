import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";

import {LivroModel} from "./livro.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl = `${environment.baseUrl}/livros`

  constructor(private http: HttpClient, private snack: MatSnackBar) { }


  findLivrosByCategoria(id_cat: String): Observable<LivroModel[]> {
    const url = `${this.baseUrl}?categoria=${id_cat}`;
    return this.http.get<LivroModel[]>(url);
  };

  findLivroById(id_livro: string): Observable<LivroModel> {
    const url = `${this.baseUrl}/${id_livro}`;
    return this.http.get<LivroModel>(url);
  }

  create(id_cat: string, livro: LivroModel): Observable<LivroModel>{
    const url = `${this.baseUrl}?categoria=${id_cat}`;
    return this.http.post<LivroModel>(url,livro);
  }

  update(livro: LivroModel): Observable<LivroModel>{
    const url = `${this.baseUrl}/${livro.id}`;
    return this.http.put<LivroModel>(url,livro);
  }

  delete(id_livro: string): Observable<void> {
    const url = `${this.baseUrl}/${id_livro}`;
    return this.http.delete<void>(url);
  }


  message(str: String): void {
    this.snack.open(`${str}`, 'OK', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000,
    });
  };
}
