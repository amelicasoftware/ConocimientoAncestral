import { Injectable } from '@angular/core';
import { Articulo } from '../models/articulo';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';
import { Observable } from 'rxjs';
import { Total } from '../models/total';

@Injectable({
  providedIn: 'root'
})
export class ServiosBusquedaService {
  public articulo: Articulo = new Articulo();
  public total: Total = new Total();
  public url: string = GlobalConstants.serviciosURL;

  // private url: string = 'http://148.215.2.20:8080/BackEndAmelic-0.0.1-SNAPSHOT/articulos/general?busqueda=';
  
  public count = 1;
  public fin = 1;
  public palabra: string = "ciencia";
  constructor(private http: HttpClient) {


  }

  leerjson(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.url + 'articulos/general?p=' +"\""+ this.palabra +"\""+ '&page=' + this.count);
  }
 
  setfin(final: number){
    this.fin = final
  }

  getfin(){
    return this.fin
  }

  getcount(){
    return this.count
  }

  setcount(pagina:number){
    this.count = pagina;  
  }

  getpalabra(){
    return this.palabra
  }

  setpalabra(pal:string){
    this.palabra = pal;  
  }

  getDcount(){
    return this.count
  }

  setDcount(pagina:number){
    this.count = pagina;  
  }


  getBusquedaArticulos(palabra: string) {
    return this.http.get(`${this.url}articulos/general?p="${palabra}"&page=${this.count}`);
  }

  getPaginaFinal(palabra: string, ultima:number) {
    return this.http.get(`${this.url}articulos/general?p="${palabra}"&page=${ultima}`);
  }
  
  getPaginaP(palabra: string){
    return this.http.get(`${this.url}articulos/general?p="${palabra}"&page=1`);
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
