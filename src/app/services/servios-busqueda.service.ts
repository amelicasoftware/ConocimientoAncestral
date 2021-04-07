import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';
import { Observable } from 'rxjs';
import { Article } from '../models/Article.model';
import { FilterChain } from '../models/FilterChain.model';
import { Total } from '../models/total.model';

@Injectable({
  providedIn: 'root'
})

export class ServiosBusquedaService {
  public articulo: Article = new Article();
  public total: Total = new Total();
  public url: string = GlobalConstants.serviciosURL;
  public urlFront: string = GlobalConstants.url;
  public count = 1;
  public fin = 1;
  public palabra = 'ciencia';
  public reversa = false;
  public palabraOrdenar = 'nulo';

  constructor(private http: HttpClient) { }

 /*  getArticles(search: string, page: number): Observable<Articulo[]>{
    console.log('Servicio para articulos: ', `${this.url}articulos/general?p=${search}&page=${page}`);
    return this.http.get<Articulo[]>(`${this.url}articulos/general?p=${search}&page=${page}`);
  } */

  getArticles(
    search: string,
    page: number,
    filters: FilterChain
  ): Observable<Article[]>{
    let filtersChain: string;
    if (search === undefined) {
      search = '';
    }
    (
      filters.countryChain
      || filters.disciplineChain
      || filters.fontChain
      || filters.languageChain
      || filters.yearChain
    )
    ? filtersChain = `f=${filters.yearChain},${filters.disciplineChain},${filters.countryChain},${filters.languageChain},${filters.fontChain},`
    : filtersChain = 'f=,,,,,';
    console.log('Servicio para articulos: ', `${this.url}articulos/general?p=${search}&page=${page}&${filtersChain}`);
    return this.http.get<Article[]>(`${this.url}articulos/general?p=${search}&page=${page}&${filtersChain}`);
  }

  getArticlesByFilters(
    search: string,
    filters: FilterChain
  ){
    let filtersChain: string;
    if (search === undefined) {
      search = '';
    }
    filtersChain = `f=${filters.yearChain},${filters.disciplineChain},${filters.countryChain},${filters.languageChain},${filters.fontChain},`;
    console.log(`${this.url}articulos/general?p="${search}"&${filtersChain}`);
    return this.http.get(`${this.url}articulos/general?p="${search}"&${filtersChain}`);
  }

  leerjson(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url + 'articulos/general?p=' + '\"' + this.palabra + '\"' + '&page=' + this.count);
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
    this.fin = final;
  }

  getfin(){
    return this.fin;
  }

  getcount(){
    return this.count;
  }

  setcount(pagina: number){
    this.count = pagina;
  }

  getpalabra(){
    return this.palabra;
  }

  setpalabra(pal: string){
    this.palabra = pal;
  }

  getDcount(){
    return this.count;
  }

  setDcount(pagina: number){
    this.count = pagina;
  }

  getBusquedaArticulos(palabra: string) {
    return this.http.get(`${this.url}articulos/general?p="${palabra}"&page=${this.count}`);
  }

  getPaginaFinal(palabra: string, ultima: number) {
    return this.http.get(`${this.url}articulos/general?p="${palabra}"&page=${ultima}`);
  }

  getPaginaP(palabra: string){
    return this.http.get(`${this.url}articulos/general?p="${palabra}"&page=1`);
  }

  getArticulosXPais(cvePais: number){
    console.log(`${this.url}articulos/pais?c=${cvePais}`);
    return this.http.get(`${this.url}articulos/pais?c=${cvePais}`);
  }

  /* Servicios para busqueda por palabra clave */

  leerjsonPC(): Observable<Article[]> {
    console.log(this.url + 'articulos/palClave?p=' + '\"' + this.palabra + '\"' + '&page=' + this.count);
    return this.http.get<Article[]>(this.url + 'articulos/palClave?p=' + '\"' + this.palabra + '\"' + '&page=' + this.count);
  }


  getBusquedaArticulosPalClav(palabra: string) {
    return this.http.get(`${this.url}articulos/palClave?p="${palabra}"&page=${this.count}`);
  }

  getPaginaFinalPalClav(palabra: string, ultima: number) {
    return this.http.get(`${this.url}articulos/palClave?p="${palabra}"&page=${ultima}`);
  }

  getPaginaPPalClav(palabra: string){
    return this.http.get(`${this.url}articulos/palClave?p="${palabra}"&page=1`);
  }

  getPaises(){
    return this.http.get(`${this.urlFront}assets/js/json/paises.json`);
  }
}
