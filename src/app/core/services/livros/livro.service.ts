import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livro } from '../../interfaces/livro';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class LivroService extends BaseService{

  api = environment.api;
  constructor(private http: HttpClient) {super(); }  

  obterTodos(): Observable<Livro[]> {
    let response = this.http
        .get<Livro[]>(`${this.UrlApiPrincipal}Livro`, this.ObterHeaderJson())
        .pipe(map(this.extractData),
              catchError(this.serviceError));    
    return response;
  }

  adicionar(form: Livro): Observable<any> {
    let response = this.http
        .post(`${this.UrlApiPrincipal}Livro`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

  atualizar(form: Livro): Observable<any> {
    let response = this.http
        .put(`${this.UrlApiPrincipal}Livro`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }  
 
  excluir(id: string): Observable<any> {
    return this.http
        .delete(`${this.UrlApiPrincipal}Livro/${id}`, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }    
  

}
