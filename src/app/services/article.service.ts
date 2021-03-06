import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { FilterChain } from '../models/FilterChain';
import { GlobalConstants } from '../common/global-constants';
import { Observable, Subject } from 'rxjs';
import { FiledSort } from '../models/filedSort';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private _search$: Subject<string> = new Subject<string>();
  private _filedSort$: Subject<FiledSort> = new Subject<FiledSort>();

  url: string = GlobalConstants.serviciosURL;
  urlFront: string = GlobalConstants.url;

  constructor(
    private http: HttpClient
  ) { }

  get search$(): Observable<string> {
    return this._search$;
  }

  get filedSort$(): Observable<FiledSort> {
    return this._filedSort$;
  }

  changeSearch(search: string){
    this._search$.next(search);
  }

  changeFiledSort(fieldSort: FiledSort) {
    this._filedSort$.next(fieldSort);
  }

  getArticles(
    search: string,
    page: number,
    reverse: boolean,
    field: string,
    filters: FilterChain,
    all: boolean
  ): Observable<Article[]>{

    let articles: Observable<Article[]>;
    const filtersChain: string = this.getFiltersChainValidate(filters);
    const fieldSort: string = this.getFieldSortValidate(reverse, field);
    const allArticles = all ? `&allArt=${all}` : '';

    console.log('Servicio para articulos: ', `${this.url}articulos/general?p=${search}&page=${page}${fieldSort}&${filtersChain}${allArticles}`);

    articles = this.http.get<Article[]>(`${this.url}articulos/general?p=${search}&page=${page}${fieldSort}&${filtersChain}${allArticles}`);

    return articles;
  }

  getArticlesByKeyword(
    search: string,
    page: number,
    reverse: boolean,
    field: string,
    filters: FilterChain
  ): Observable<Article[]>{
    let articles: Observable<Article[]>;
    const filtersChain: string = this.getFiltersChainValidate(filters);
    const fieldSort: string = this.getFieldSortValidate(reverse, field);

    articles = this.http.get<Article[]>(`${this.url}articulos/palClave?p=${search}&page=${page}${fieldSort}&${filtersChain}`);

    return articles;
  }

  getArticlesByCountry(
    idCountry: string,
    page: number,
    reverse: boolean,
    field: string,
    filters: FilterChain
  ): Observable<Article[]>{
    let articles: Observable<Article[]>;
    const filtersChain: string = this.getFiltersChainValidate(filters);
    const fieldSort: string = this.getFieldSortValidate(reverse, field);

    console.log(`${this.url}articulos/pais?c=${idCountry}&page=${page}${fieldSort}&${filtersChain}`);
    articles = this.http.get<Article[]>(`${this.url}articulos/pais?c=${idCountry}&page=${page}${fieldSort}&${filtersChain}`);

    return articles;
  }

  getCountries(){
    return this.http.get(`${this.urlFront}assets/js/json/paises.json`);
  }

  getFiltersChainValidate(filters: FilterChain): string{
    let filtersChain: string;
    (
      filters.countryChain
      || filters.disciplineChain
      || filters.fontChain
      || filters.languageChain
      || filters.yearChain
    )
    ? filtersChain = `f=${filters.yearChain},${filters.disciplineChain},${filters.countryChain},${filters.languageChain},${filters.fontChain},`
    : filtersChain = 'f=,,,,,';

    return filtersChain;
  }

  getFieldSortValidate(reverse: boolean, field: string): string{
    let fieldSort: string;

    field
    ? fieldSort = `&r=${reverse}&palOrd=${field}`
    : fieldSort = '';

    return fieldSort;
  }

  allArticles(search: string): boolean{
    let all: boolean;

    (search === 'allArt')
    ? all = true
    : all = false;

    return all;
  }
}
