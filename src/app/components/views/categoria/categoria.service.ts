import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoriaModel} from "./categoria.model";
import {environment} from "../../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl = `${environment.baseUrl}/categorias`

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findAllCategorias(): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(this.baseUrl)
  };

  findCategoriaById(id: string): Observable<CategoriaModel> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<CategoriaModel>(url);
  };

  create(categoria: CategoriaModel): Observable<CategoriaModel> {
    return this.http.post<CategoriaModel>(this.baseUrl, categoria);
  };

  update(categoria: CategoriaModel): Observable<CategoriaModel> {
    const url = `${this.baseUrl}/${categoria.id}`
    return this.http.put<CategoriaModel>(url, categoria);
  };

  delete(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  };

  message(str: string): void {
    this.snack.open(`${str}`, 'OK', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000,
    });
  }
}
