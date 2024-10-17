import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(true);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  loading: boolean = false;

  constructor() {
    this.showLoaderUntilCompleted(this.loading$);
   }

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null)
      .pipe(
        tap(() => this.loadingOn()),
        concatMap(() => obs$),
        finalize(() => this.loadingOff())
      );
  }

  loadingOn() {
    this.loading = true;
  }

  loadingOff() {
    this.loading = false;
  }

}
