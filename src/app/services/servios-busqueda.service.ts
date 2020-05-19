import { Injectable } from '@angular/core';
import { Articulo } from '../models/articulo';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiosBusquedaService {
  public articulo: Articulo = new Articulo();
  public url: string = GlobalConstants.serviciosURL;

  // private url: string = 'http://148.215.2.20:8080/BackEndAmelic-0.0.1-SNAPSHOT/articulos/general?busqueda=';
  public datarecibed: string = 'ciencia';
  constructor(private http: HttpClient) {


  }

  leerjson(): Observable<Articulo[]> {
    console.log('urltodo' + this.url + `articulos/general?p="${this.datarecibed}"`)
    return this.http.get<Articulo[]>(this.url + `articulos/general?p="${this.datarecibed}"`);
  }

  getBusquedaArticulos(palabra: string) {
    return this.http.get(`${this.url}articulos/general?p="${palabra}"`);
  }

  getBusquedaArtFiltro(palabra: string, cadenaAnio: string, cadenaPais: string,
                       cadenaDisciplina: string, cadenaFuente: string, cadenaIdioma: string) {
    if (palabra === undefined) {
      palabra = '';
    }
    console.log('servicio', `${this.url}articulos/general?p="${palabra}"&f=${cadenaAnio},${cadenaDisciplina},${cadenaPais},${cadenaIdioma},${cadenaFuente},`);
    return this.http.get(`${this.url}articulos/general?p="${palabra}"&f=${cadenaAnio},${cadenaDisciplina},${cadenaPais},${cadenaIdioma},${cadenaFuente},`);
  }
}
