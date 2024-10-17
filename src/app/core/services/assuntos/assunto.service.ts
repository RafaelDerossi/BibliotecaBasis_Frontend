import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Assunto } from '../../interfaces/assunto';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class AssuntoService extends BaseService{

  api = environment.api;
  constructor(private http: HttpClient) {super(); }  

  obterTodos(): Observable<Assunto[]> {
    let response = this.http
        .get<Assunto[]>(`${this.UrlApiPrincipal}Assunto`, this.ObterHeaderJson())
        .pipe(map(this.extractData),
              catchError(this.serviceError));    
    return response;
  }

  adicionar(form: Assunto): Observable<any> {
    let response = this.http
        .post(`${this.UrlApiPrincipal}Assunto`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

  atualizar(form: Assunto): Observable<any> {
    let response = this.http
        .put(`${this.UrlApiPrincipal}Assunto`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }  
 
  excluir(id: string): Observable<any> {
    return this.http
        .delete(`${this.UrlApiPrincipal}Assunto/${id}`, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }    
  

}
