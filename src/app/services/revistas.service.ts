import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';
import { Observable, from } from 'rxjs';
import { Revistas } from '../models/revistas';


@Injectable({
  providedIn: 'root'
})


export class RevistasService {
  public revista: Revistas = new Revistas();
  public url: string = GlobalConstants.serviciosURL;

  // private url: string = 'http://148.215.2.20:8080/BackEndAmelic-0.0.1-SNAPSHOT/articulos/general?busqueda=';
  public datarecibed: string = 'brasil';
  constructor(private http: HttpClient) {


  }

  leerjson(): Observable<Revistas[]> {
    return this.http.get<Revistas[]>(this.url + 'revistas/general?p=' +this.datarecibed);
  }


  
  getBusquedaRevista(palabra: string) {
    return this.http.get(`${this.url}revistas/general?p="${palabra}"`);
  }
}
