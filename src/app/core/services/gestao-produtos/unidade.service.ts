import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Unidade } from '../../interfaces/unidade';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService extends BaseService{

  api = environment.api;
  constructor(private http: HttpClient) {super(); }
 
  
  obterPorOrganizacao(organizacaoId: any): Observable<Unidade[]> {
    let response = this.http
        .get<Unidade[]>(`${this.UrlApiPrincipal}unidade/por-organizacao/${organizacaoId}`, this.ObterHeaderJson())
        .pipe(catchError(this.serviceError));
    
    return response;
  }

  obterPorId(unidadeId: any): Observable<any> {
    let response = this.http
        .get(`${this.UrlApiPrincipal}unidade/${unidadeId}`, this.ObterHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

 
  adicionar(form: Unidade): Observable<any> {
    let response = this.http
        .post(`${this.UrlApiPrincipal}unidade`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }


  atualizar(form: Unidade): Observable<any> {
    let response = this.http
        .put(`${this.UrlApiPrincipal}unidade`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }
 
 
  excluir(id: string): Observable<any> {
    return this.http
        .delete(`${this.UrlApiPrincipal}unidade/${id}`, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }
  
}
