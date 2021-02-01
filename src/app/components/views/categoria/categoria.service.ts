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

  url = `${environment.baseUrl}/categorias`

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findAllCategorias(): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(this.url)
  }

  create(categoria: CategoriaModel): Observable<CategoriaModel> {
    return this.http.post<CategoriaModel>(this.url, categoria);
  }

  message(str: String): void {
    this.snack.open(`${str}`, 'OK', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000,
    })
  }
}
