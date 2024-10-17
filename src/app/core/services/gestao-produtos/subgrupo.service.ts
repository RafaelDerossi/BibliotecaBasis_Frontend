import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subgrupo } from '../../interfaces/subgrupo';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class SubgrupoService extends BaseService{

  api = environment.api;
  constructor(private http: HttpClient) {super(); }
 
  
  obterPorOrganizacao(organizacaoId: any): Observable<Subgrupo[]> {
    let response = this.http
        .get<Subgrupo[]>(`${this.UrlApiPrincipal}subgrupo/por-organizacao/${organizacaoId}`, this.ObterHeaderJson())
        .pipe(catchError(this.serviceError));
    
    return response;
  }

  obterPorId(subgrupoId: any): Observable<Subgrupo> {
    let response = this.http
        .get(`${this.UrlApiPrincipal}subgrupo/${subgrupoId}`, this.ObterHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

  adicionar(form: Subgrupo): Observable<any> {
    let response = this.http
        .post(`${this.UrlApiPrincipal}subgrupo`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

  atualizar(form: Subgrupo): Observable<any> {
    let response = this.http
        .put(`${this.UrlApiPrincipal}subgrupo`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }


  excluir(id: string): Observable<any> {
    return this.http
        .delete(`${this.UrlApiPrincipal}subgrupo/${id}`, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }

 
}
