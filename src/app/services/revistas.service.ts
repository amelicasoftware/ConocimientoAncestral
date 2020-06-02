import { Injectable } from '@angular/core';
import { Revistas } from '../models/revistas';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';
import { Observable, from } from 'rxjs';
import { Total } from '../models/total';
import { FiltrosService } from './filtros.service';
import { PaginadorService } from './paginador.service';
import { FiltrosRevistasService } from './filtros-revistas.service';

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
  public reversa: boolean = false;
  public palabraOrdenar: string = 'nombreRevista';

  constructor(private http: HttpClient, private filtrosService: FiltrosService, private paginadorService: PaginadorService,
              private filtrosRevistasService: FiltrosRevistasService) {
    
  }
  

  leerjson(): Observable<Revistas[]> {
    console.log(this.palabra)
    return this.http.get<Revistas[]>(this.url + 'revistas/general?p=' +"\""+ this.palabra +"\""+ '&page=' + this.count+'&r='+this.reversa);
   
  }

  ordenarReversa(campo:string, palabra:string): Observable<Revistas[]>{
    console.log(this.url + 'revistas/general?p=' +"\""+ palabra +"\""+ '&page=' + this.paginadorService.posicion + '&r=' + this.reversa + '&palOrd=' + campo + `&${this.filtrosService.cadenafiltros}`);
    return this.http.get<Revistas[]>(this.url + 'revistas/general?p=' +"\""+ palabra +"\""+ '&page=' + this.paginadorService.posicion + '&r=' + this.reversa + '&palOrd=' + campo + `&${this.filtrosService.cadenafiltros}`);
  }
  
  setpalabraOrdenar(palabraOrdenar: string){
      this.palabraOrdenar = palabraOrdenar;
  }
  
  getpalabraOrdenar(){
    return this.palabraOrdenar;
  }

  setreversa(reversa: boolean){
    this.reversa = reversa;
  }

  getreversa(){
    return this.reversa;
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
    console.log(`${this.url}revistas/general?p="${palabra}"&page=1&${this.filtrosService.cadenafiltros}`);
    return this.http.get(`${this.url}revistas/general?p="${palabra}"&page=1&${this.filtrosService.cadenafiltros}`);
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
    if(this.paginadorService.reversa === undefined){
      this.paginadorService.reversa = false;
    }
    this.filtrosService.cadenafiltros = `f=${cadenaDisciplina},${cadenaInstitucion},${cadenaPais},${cadenaFuente},`
    console.log('servicio', `${this.url}revistas/general?p="${palabra}"&f=${cadenaDisciplina},${cadenaInstitucion},${cadenaPais},${cadenaFuente},&r=${this.paginadorService.reversa}&palOrd=${this.paginadorService.campo}`);
    return this.http.get(`${this.url}revistas/general?p="${palabra}"&f=${cadenaDisciplina},${cadenaInstitucion},${cadenaPais},${cadenaFuente},&r=${this.paginadorService.reversa}&palOrd=${this.paginadorService.campo}`);
  }

  getBusquedaRevistasPaginador(palabra: string, pagina: number) {
    console.log(`${this.url}revistas/general?p="${this.filtrosRevistasService.palabra}"&page=${pagina}&${this.filtrosService.cadenafiltros}&r=${this.paginadorService.reversa}&palOrd=${this.paginadorService.campo}`);
    return this.http.get(`${this.url}revistas/general?p="${this.filtrosRevistasService.palabra}"&page=${pagina}&${this.filtrosService.cadenafiltros}&r=${this.paginadorService.reversa}&palOrd=${this.paginadorService.campo}`);
  }
}
