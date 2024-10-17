import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AtualizaAplicacao, NovaAplicacao } from '../../interfaces/aplicacao';
import { AplicacaoFlat } from '../../interfaces/aplicacaoFlat';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class AplicacaoService extends BaseService{

  api = environment.api;
  constructor(private http: HttpClient) {super(); }
 
  
  obterPorOrganizacao(organizacaoId: any): Observable<AplicacaoFlat[]> {
    let response = this.http
        .get<AplicacaoFlat[]>(`${this.UrlApiPrincipal}aplicacao/por-organizacao/${organizacaoId}`, this.ObterHeaderJson())
        .pipe(catchError(this.serviceError));
    
    return response;
  }

  obterPorId(produtoId: any): Observable<any> {
    let response = this.http
        .get(`${this.UrlApiPrincipal}aplicacao/${produtoId}`, this.ObterHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

  buscaGeral(organizacaoId: any, pesquisa: any): Observable<AplicacaoFlat[]> {
    let response = this.http
        .get<AplicacaoFlat[]>(`${this.UrlApiPrincipal}aplicacao/busca-geral-por-organizacao/${organizacaoId}/${pesquisa}`, this.ObterHeaderJson())
        .pipe(catchError(this.serviceError));
    
    return response;
  }

  buscaGeralPorSubgrupo(organizacaoId: any, subgrupoId: any, pesquisa: any): Observable<AplicacaoFlat[]> {
    let response = this.http
        .get<AplicacaoFlat[]>(`${this.UrlApiPrincipal}aplicacao/busca-geral-por-subgrupo-e-organizacao/${organizacaoId}/${subgrupoId}/${pesquisa}`, this.ObterHeaderJson())
        .pipe(catchError(this.serviceError));
    
    return response;
  }
  
  
  adicionar(form: NovaAplicacao): Observable<any> {
    let response = this.http
        .post(`${this.UrlApiPrincipal}aplicacao`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

  atualizar(form: AtualizaAplicacao): Observable<any> {
    let response = this.http
        .put(`${this.UrlApiPrincipal}aplicacao`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  } 
 
  excluir(id: string): Observable<any> {
    return this.http
        .delete(`${this.UrlApiPrincipal}aplicacao/${id}`, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }    

  
}
