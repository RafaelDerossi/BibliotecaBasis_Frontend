import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NovoProduto, Produto } from '../../interfaces/produto';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService{

  api = environment.api;
  constructor(private http: HttpClient) {super(); }
 
  
  obterPorOrganizacao(organizacaoId: any): Observable<Produto[]> {
    let response = this.http
        .get<Produto[]>(`${this.UrlApiPrincipal}produto/por-organizacao/${organizacaoId}`, this.ObterHeaderJson())
        .pipe(catchError(this.serviceError));
    
    return response;
  }

  obterPorId(produtoId: any): Observable<Produto> {
    let response = this.http
        .get(`${this.UrlApiPrincipal}produto/${produtoId}`, this.ObterHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

  adicionar(form: NovoProduto): Observable<any> {
    let response = this.http
        .post(`${this.UrlApiPrincipal}produto`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }


  atualizar(form: Produto): Observable<any> {
    let response = this.http
        .put(`${this.UrlApiPrincipal}produto`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }
 
 
  excluir(id: string): Observable<any> {
    return this.http
        .delete(`${this.UrlApiPrincipal}produto/${id}`, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }    

  
}
