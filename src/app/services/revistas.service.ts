import { Injectable } from '@angular/core';
import { Revistas } from '../models/revistas';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';
import { Observable, from } from 'rxjs';
import { Total } from '../models/total';

@Injectable({
  providedIn: 'root'
})

export class RevistasService {
  public revista: Revistas = new Revistas();
  public total: Total = new Total();
  public url: string = GlobalConstants.serviciosURL; 

  
  public count = 1;
  public fin = 1;
  public palabra: string = 'ciencia';

  constructor(private http: HttpClient) {
  }


  leerjson(): Observable<Revistas[]> {
    console.log(this.palabra)
    return this.http.get<Revistas[]>(this.url + 'revistas/general?p=' +"\""+ this.palabra +"\""+ '&page=' + this.count);
   
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

  getBusquedaRevistas(palabra: string) {
    return this.http.get(`${this.url}revistas/general?p="${palabra}"&page=${this.count}`);
  }

  getPaginaFinal(palabra: string, ultima:number) {
    return this.http.get(`${this.url}revistas/general?p="${palabra}"&page=${ultima}`);
  }
  
  getPaginaP(palabra: string){
    return this.http.get(`${this.url}revistas/general?p="${palabra}"&page=1`);
  }

  getBusquedaRevistaFiltro(palabra: string, cadenaDisciplina: string, cadenaInstitucion: string,
                           cadenaPais: string, cadenaFuente: string) {
    if (palabra === undefined) {
      palabra = '';
    }
    console.log('servicio', `${this.url}revistas/general?p="${palabra}"&f=${cadenaDisciplina},${cadenaInstitucion},${cadenaPais},${cadenaFuente},`);
    return this.http.get(`${this.url}revistas/general?p="${palabra}"&f=${cadenaDisciplina},${cadenaInstitucion},${cadenaPais},${cadenaFuente},`);
  }

}
