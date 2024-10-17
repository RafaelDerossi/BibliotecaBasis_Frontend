import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Montadora } from '../../interfaces/montadora';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class MontadoraService extends BaseService{

  api = environment.api;
  constructor(private http: HttpClient) {super(); }
 
  
  obterPorOrganizacao(organizacaoId: any): Observable<Montadora[]> {
    let response = this.http
        .get<Montadora[]>(`${this.UrlApiPrincipal}montadora/por-organizacao/${organizacaoId}`, this.ObterHeaderJson())
        .pipe(catchError(this.serviceError));
    
    return response;
  }

  obterPorId(montadoraId: any): Observable<any> {
    let response = this.http
        .get(`${this.UrlApiPrincipal}montadora/${montadoraId}`, this.ObterHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

 
  adicionar(form: Montadora): Observable<any> {
    let response = this.http
        .post(`${this.UrlApiPrincipal}montadora`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }


  atualizar(form: Montadora): Observable<any> {
    let response = this.http
        .put(`${this.UrlApiPrincipal}montadora`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }
 
 
  excluir(id: string): Observable<any> {
    return this.http
        .delete(`${this.UrlApiPrincipal}montadora/${id}`, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }    
  
}
