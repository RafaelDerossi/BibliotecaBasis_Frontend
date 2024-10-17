import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grade } from '../../interfaces/grade';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class GradeService extends BaseService{

  api = environment.api;
  constructor(private http: HttpClient) {super(); }
 
  
  obterPorOrganizacao(organizacaoId: any): Observable<Grade[]> {
    let response = this.http
        .get<Grade[]>(`${this.UrlApiPrincipal}grade/por-organizacao/${organizacaoId}`, this.ObterHeaderJson())
        .pipe(catchError(this.serviceError));
    
    return response;
  }

  obterPorId(gradeId: any): Observable<any> {
    let response = this.http
        .get(`${this.UrlApiPrincipal}grade/${gradeId}`, this.ObterHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }

 

  adicionar(form: Grade): Observable<any> {
    let response = this.http
        .post(`${this.UrlApiPrincipal}grade`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }


  atualizar(form: Grade): Observable<any> {
    let response = this.http
        .put(`${this.UrlApiPrincipal}grade`, form)
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
    
    return response;
  }
 
 
  excluir(id: string): Observable<any> {
    return this.http
        .delete(`${this.UrlApiPrincipal}grade/${id}`, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }    
}
