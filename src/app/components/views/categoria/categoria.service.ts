import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoriaModel} from "./categoria.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = `${environment.baseUrl}/categorias`

  constructor(private http: HttpClient) { }

  findAllCategorias(): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(this.url)
  }
}
