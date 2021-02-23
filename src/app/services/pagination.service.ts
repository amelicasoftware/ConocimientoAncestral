import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private _position$: Subject<number> = new Subject<number>();
  private _initialPosition$: Subject<number> =  new Subject<number>();
  private _finalPosition$: Subject<number> = new Subject<number>();

  constructor() {}

  get position$(): Observable<number> {
    return this._position$;
  }

  get initialPosition$(): Observable<number> {
    return this._initialPosition$;
  }

  get finalPosition$(): Observable<number> {
    return this._finalPosition$;
  }

  changePosition(page: number) {
    console.log('change position');
    this._position$.next(page);
  }

  changeInitialPosition(){
    this._initialPosition$.next(1);
  }

  changeFinalPosition(totalPages: number, typeSearch: string) {
    console.log('change final position');
    let finalPage: number;

    typeSearch === 'articles'
      ? Number.isInteger(totalPages / 10)
        ? (finalPage = totalPages / 10)
        : (finalPage = Math.floor(totalPages / 10) + 1)
      : Number.isInteger(totalPages / 10)
        ? (finalPage = totalPages / 12)
        : (finalPage = Math.floor(totalPages / 12) + 1);

    this._finalPosition$.next(finalPage);
  }
}
