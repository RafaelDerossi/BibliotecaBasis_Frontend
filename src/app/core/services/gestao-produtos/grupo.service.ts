import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grupo } from '../../interfaces/grupo';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoService extends BaseService{

  api = environment.api;
  constructor(private http: HttpClient) {super(); }
 
  
  obterPorOrganizacao(organizacaoId: any): Observable<Grupo[]> {
    let response = this.http
        .get<Grupo[]>(`${this.UrlApiPrincipal}grupo/por-organizacao/${organizacaoId}`, this.ObterHeaderJson())
        .pipe(catchError(this.serviceError));
    
    return response;
  }

  obterPorId(grupoId: any): Observable<Grupo> {
    let response = this.http
        .get(`${this.UrlApiPrincipal}grupo/${grupoId}`, this.ObterHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

  adicionar(form: Grupo): Observable<any> {
    let response = this.http
        .post(`${this.UrlApiPrincipal}grupo`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

  atualizar(form: Grupo): Observable<any> {
    let response = this.http
        .put(`${this.UrlApiPrincipal}grupo`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  } 

  excluir(id: string): Observable<any> {
    return this.http
        .delete(`${this.UrlApiPrincipal}grupo/${id}`, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }    

}
