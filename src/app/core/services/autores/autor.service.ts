import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Autor } from '../../interfaces/autor';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class AutorService extends BaseService{

  api = environment.api;
  constructor(private http: HttpClient) {super(); }  

  obterTodos(): Observable<Autor[]> {
    let response = this.http
        .get<Autor[]>(`${this.UrlApiPrincipal}Autor`, this.ObterHeaderJson())
        .pipe(map(this.extractData),
              catchError(this.serviceError));    
    return response;
  }

  adicionar(form: Autor): Observable<any> {
    let response = this.http
        .post(`${this.UrlApiPrincipal}Autor`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

  atualizar(form: Autor): Observable<any> {
    let response = this.http
        .put(`${this.UrlApiPrincipal}Autor`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }  
 
  excluir(id: string): Observable<any> {
    return this.http
        .delete(`${this.UrlApiPrincipal}Autor/${id}`, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }    
  

}
