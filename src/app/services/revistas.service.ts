import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';
import { Total } from '../models/total';

@Injectable({
  providedIn: 'root',
})
export class RevistasService {
  public total: Total = new Total();
  public url: string = GlobalConstants.serviciosURL;
  public urlFront: string = GlobalConstants.url;
  public count = 1;
  public fin = 1;
  public palabra: string;
  public reversa = false;
  public palabraOrdenar = 'nombreRevista';

  constructor(
    private http: HttpClient,
  ) {}

  /* leerjson(): Observable<Revistas[]> {
    return this.http.get<Revistas[]>(
      this.url +
        'revistas/general?p=' +
        '"' +
        this.palabra +
        '"' +
        '&page=' +
        this.count +
        '&r=' +
        this.reversa +
        '&allRev=' +
        this.filtrosRevistasService.allRevistas
    );
  } */

  /* ordenarReversa(campo: string, palabra: string): Observable<Revistas[]> {
    return this.http.get<Revistas[]>(
      this.url +
        'revistas/general?p=' +
        '"' +
        palabra +
        '"' +
        '&page=' +
        this.paginadorService.posicion +
        '&r=' +
        this.reversa +
        '&palOrd=' +
        campo +
        `&${this.filtrosService.cadenafiltros}`
    );
  } */

  setpalabraOrdenar(palabraOrdenar: string) {
    this.palabraOrdenar = palabraOrdenar;
  }

  getpalabraOrdenar() {
    return this.palabraOrdenar;
  }

  setreversa(reversa: boolean) {
    this.reversa = reversa;
  }

  getreversa() {
    return this.reversa;
  }

  setfin(final: number) {
    this.fin = final;
  }

  getfin() {
    return this.fin;
  }

  getcount() {
    return this.count;
  }

  setcount(pagina: number) {
    this.count = pagina;
  }

  getpalabra() {
    return this.palabra;
  }

  setpalabra(pal: string) {
    this.palabra = pal;
  }

  getDcount() {
    return this.count;
  }

  setDcount(pagina: number) {
    this.count = pagina;
  }

  getPaginaFinal(palabra: string, ultima: number) {
    return this.http.get(
      `${this.url}revistas/general?p="${palabra}"&page=${ultima}`
    );
  }

  getPaginaP(palabra: string) {
    return this.http.get(`${this.url}revistas/general?p="${palabra}"&page=1`);
  }

  /* getBusquedaRevistaFiltro(
    palabra: string,
    cadenaDisciplina: string,
    cadenaInstitucion: string,
    cadenaPais: string,
    cadenaFuente: string
  ) {
    if (palabra === undefined) {
      palabra = '';
    }
    if (this.paginadorService.reversa === undefined) {
      this.paginadorService.reversa = false;
    }
    this.filtrosRevistasService.cadenaFitros = `f=${cadenaDisciplina},${cadenaInstitucion},${cadenaPais},${cadenaFuente},`;
    console.log(
      'servicio',
      `${this.url}revistas/general?p="${palabra}"&f=${cadenaDisciplina},
      ${cadenaInstitucion},${cadenaPais},${cadenaFuente},&r=${this.paginadorService.reversa}&palOrd=${this.paginadorService.campo}`
    );
    return this.http.get(
      `${this.url}revistas/general?p="${palabra}"&f=${cadenaDisciplina},${cadenaInstitucion},
      ${cadenaPais},${cadenaFuente},&r=${this.paginadorService.reversa}&palOrd=
      ${this.paginadorService.campo}&allRev=${this.filtrosRevistasService.allRevistas}`
    );
  } */

  /* getBusquedaRevistasPaginador(palabra: string, pagina: number) {
    console.log(
      `${this.url}revistas/general?p="${this.filtrosRevistasService.palabra}"&page=
      ${pagina}&${this.filtrosService.cadenafiltros}&r=${this.paginadorService.reversa}&palOrd=${this.paginadorService.campo}`
    );
    return this.http.get(
      `${this.url}revistas/general?p="${this.filtrosRevistasService.palabra}"
      &page=${pagina}&${this.filtrosService.cadenafiltros}&r=${this.paginadorService.reversa}
      &palOrd=${this.paginadorService.campo}&allRev=${this.filtrosRevistasService.allRevistas}`
    );
  } */

  getRevistasXPais(cvePais: number) {
    console.log(`${this.url}revistas/pais?c=${cvePais}`);
    return this.http.get(`${this.url}revistas/pais?c=${cvePais}`);
  }

  /* getRevistasXPaisFiltro(
    cadenaDisciplina: string,
    cadenaInstitucion: string,
    cadenaPais: string,
    cadenaFuente: string,
    cvePais: number
  ) {
    this.filtrosRevistasService.cadenaFitros = `f=${cadenaDisciplina},${cadenaInstitucion},${cadenaPais},${cadenaFuente},`;
    console.log(this.filtrosRevistasService.cadenaFitros);
    console.log(
      `${this.url}revistas/pais?c=${cvePais}&${this.filtrosRevistasService.cadenaFitros}`
    );
    return this.http.get(
      `${this.url}revistas/pais?c=${cvePais}&${this.filtrosRevistasService.cadenaFitros}`
    );
  } */

  /* getBusquedaRevistasPaginadorPais(pagina: number, cvePais: number) {
    console.log(
      `${this.url}revistas/pais?c=${cvePais}&page=${pagina}&${this.filtrosRevistasService.cadenaFitros}`
    );
    return this.http.get(
      `${this.url}revistas/pais?c=${cvePais}&page=${pagina}&
      ${this.filtrosRevistasService.cadenaFitros}&r=${this.paginadorService.reversa}&palOrd=${this.paginadorService.campo}`
    );
  } */

  /* getRevistasXOrdenacion(
    campo: string,
    cvePais: number
  ): Observable<Revistas[]> {
    console.log(
      `${this.url}revistas/pais?c=${cvePais}&page=${this.paginadorService.posicion}
      &r=${this.reversa}&palOrd=${campo}&${this.filtrosService.cadenafiltros}`
    );
    return this.http.get<Revistas[]>(
      `${this.url}revistas/pais?c=${cvePais}&page=${this.paginadorService.posicion}
      &r=${this.reversa}&palOrd=${campo}&${this.filtrosService.cadenafiltros}&allRev=${this.filtrosRevistasService.allRevistas}`
    );
  } */

  getPaises() {
    return this.http.get(`${this.urlFront}assets/js/json/paises.json`);
  }
}
