import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aliquota } from '../../interfaces/aliquota';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class AliquotaService extends BaseService{

  api = environment.api;
  constructor(private http: HttpClient) {super(); }
 
  
  obterPorOrganizacao(organizacaoId: any): Observable<Aliquota[]> {
    let response = this.http
        .get<Aliquota[]>(`${this.UrlApiPrincipal}aliquota/por-organizacao/${organizacaoId}`, this.ObterHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

  obterPorId(aliquotaId: any): Observable<any> {
    let response = this.http
        .get(`${this.UrlApiPrincipal}aliquota/${aliquotaId}`, this.ObterHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

  
  adicionar(form: Aliquota): Observable<any> {
    let response = this.http
        .post(`${this.UrlApiPrincipal}aliquota`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }


  atualizar(form: Aliquota): Observable<any> {
    let response = this.http
        .put(`${this.UrlApiPrincipal}aliquota`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }
 
 
  excluir(id: string): Observable<any> {
    return this.http
        .delete(`${this.UrlApiPrincipal}aliquota/${id}`, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }

  
}
