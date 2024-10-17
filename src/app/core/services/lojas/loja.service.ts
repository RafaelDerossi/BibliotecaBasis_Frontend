import { HttpClient } from '@angular/common/http';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Loja } from '../../interfaces/loja';
import { AtualizaUsuario, Usuario } from '../../interfaces/usuario';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class LojaService extends BaseService{

  api = environment.api;
  constructor(private http: HttpClient) {super(); }
  
  obterPorId(id: any): Observable<any> {
    let response = this.http
        .get(`${this.UrlApiPrincipal}loja/${id}`, this.ObterHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

  obterPorOrganizacao(organizacaoId: any): Observable<Loja[]> {
    let response = this.http
        .get<Loja[]>(`${this.UrlApiPrincipal}loja/por-organizacao/${organizacaoId}`, this.ObterHeaderJson())
        .pipe(catchError(this.serviceError));
    
    return response;
  }

  adicionar(form: Loja): Observable<any> {
    let response = this.http
        .post(`${this.UrlApiPrincipal}loja`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

  atualizar(form: Loja): Observable<any> {
    let response = this.http
        .put(`${this.UrlApiPrincipal}loja`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

  atualizarFoto(form: FormData): Observable<any> {
    let response = this.http
        .put(`${this.UrlApiPrincipal}loja/foto`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }
 
  excluir(id: string): Observable<any> {
    return this.http
        .delete(`${this.UrlApiPrincipal}loja/${id}`, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }    
  

}
