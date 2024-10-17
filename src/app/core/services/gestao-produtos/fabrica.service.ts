import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fabrica } from '../../interfaces/fabrica';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class FabricaService extends BaseService{

  api = environment.api;
  constructor(private http: HttpClient) {super(); }
 
  
  obterPorOrganizacao(organizacaoId: any): Observable<Fabrica[]> {
    let response = this.http
        .get<Fabrica[]>(`${this.UrlApiPrincipal}fabrica/por-organizacao/${organizacaoId}`, this.ObterHeaderJson())
        .pipe(catchError(this.serviceError));
    
    return response;
  }

  obterPorId(fabricaId: any): Observable<Fabrica> {
    let response = this.http
        .get(`${this.UrlApiPrincipal}fabrica/${fabricaId}`, this.ObterHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

 
  adicionar(form: Fabrica): Observable<any> {
    let response = this.http
        .post(`${this.UrlApiPrincipal}fabrica`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }


  atualizar(form: Fabrica): Observable<any> {
    let response = this.http
        .put(`${this.UrlApiPrincipal}fabrica`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }
 
 
  excluir(id: string): Observable<any> {
    return this.http
        .delete(`${this.UrlApiPrincipal}fabrica/${id}`, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }    
 
}
