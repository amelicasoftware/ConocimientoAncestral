import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ArticleResult } from '../models/ArticleResult.model';
import { environment } from '../../environments/environment';
import { FiledSort } from '../models/filedSort.model';
import { FilterChain } from '../models/FilterChain.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private _search$: Subject<string> = new Subject<string>();
  private _filedSort$: Subject<FiledSort> = new Subject<FiledSort>();

  public url: string = environment.baseUrl;
  private urlProject: string = environment.urlProject;

  constructor(
    private http: HttpClient
  ) { }

  normalize = ( () => {
    const from = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
    const to   = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
    const mapping = {};

    for (let i = 0, j = from.length; i < j; i++ ) {
          mapping[ from.charAt( i ) ] = to.charAt( i );
    }

    return (str: string) => {
      str ? str = str.replace(/ñ/gi, 'n-n') : str = '\'\'';
      const ret = [];
      for ( let i = 0, j = str.length; i < j; i++ ) {
        const c = str.charAt( i );
        if ( mapping.hasOwnProperty( str.charAt( i ) ) ) {
          ret.push( mapping[ c ] );
        } else {
          ret.push( c );
        }
      }

      return ret.join( '' );
    };
  })();

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

  addQuotes(word: string): string {
    const firstLetter = word.charAt(0);
    const lastLetter = word.charAt(word.length - 1);
    let wordWithQuote = '';
    !(firstLetter === '\"')
    ? !(lastLetter === '\"')
      ? wordWithQuote = '\"' + word + '\"'
      :  wordWithQuote = '\"' + word
    : !(lastLetter === '\"')
      ? wordWithQuote = word + '\"'
      : wordWithQuote = word;
    console.log(wordWithQuote);
    return wordWithQuote;
  }

  getArticles(
    search: string,
    page: number,
    reverse: number,
    field: string,
    filters: FilterChain,
    all: boolean
  ): Observable<ArticleResult>{
    let articles: Observable<ArticleResult>;
    // Preguntar para ver si habra un parametro para todas las revistas
    /* const allArticles = all ? `&allArt=${all}` : ''; */
    search = this.normalize(search);
    search = this.addQuotes(search);

    console.log('Servicio para articulos: ', `${this.url}articulos/ancestral/${search}/${page}/10/relevancia/0/{"anios":"${filters.yearChain}","idiomas":"${filters.languageChain}", "paises":"${filters.countryChain}","areas":"","disciplinas":"${filters.disciplineChain}","autores":"","instituciones":"","origen":"","funete":"","fb":1}'`);
    articles = this.http.get<ArticleResult>(`${this.url}articulos/ancestral/${search}/${page}/10/${field}/${reverse}/{"anios":"${filters.yearChain}","idiomas":"${filters.languageChain}", "paises":"${filters.countryChain}","areas":"","disciplinas":"${filters.disciplineChain}","autores":"","instituciones":"","origen":"","funete":"","fb":1}'`);

    return articles;
  }

  getArticlesByKeyword(
    search: string,
    page: number,
    reverse: number,
    field: string,
    filters: FilterChain,
  ): Observable<ArticleResult>{
    let articles: Observable<ArticleResult>;
    search = this.normalize(search);
    search = this.addQuotes(search);

    console.log('Servicio para articulos por palabra clave: ', `${this.url}articulos/ancestral/palabras/${search}/${page}/10/${field}/${reverse}/{"anios":"${filters.yearChain}","idiomas":"${filters.languageChain}", "paises":"${filters.countryChain}","areas":"","disciplinas":"${filters.disciplineChain}","autores":"","instituciones":"","origen":"","funete":"","fb":1}'`);
    articles = this.http.get<ArticleResult>(`${this.url}articulos/ancestral/palabras/${search}/${page}/10/${field}/${reverse}/{"anios":"${filters.yearChain}","idiomas":"${filters.languageChain}", "paises":"${filters.countryChain}","areas":"","disciplinas":"${filters.disciplineChain}","autores":"","instituciones":"","origen":"","funete":"","fb":1}'`);

    return articles;
  }

  getArticlesByCountry(
    countryId: string,
    page: number,
    reverse: number,
    field: string,
    filters: FilterChain
  ): Observable<ArticleResult>{
    let articles: Observable<ArticleResult>;

    console.log('Servicio para articulos por país: ', `${this.url}articulos/ancestral/pais/${countryId}/${page}/10/${field}/${reverse}/{"anios":"${filters.yearChain}","idiomas":"${filters.languageChain}", "paises":"${filters.countryChain}","areas":"","disciplinas":"${filters.disciplineChain}","autores":"","instituciones":"","origen":"","funete":"","fb":1}'`);
    articles = this.http.get<ArticleResult>(`${this.url}articulos/ancestral/pais/${countryId}/${page}/10/${field}/${reverse}/{"anios":"${filters.yearChain}","idiomas":"${filters.languageChain}", "paises":"${filters.countryChain}","areas":"","disciplinas":"${filters.disciplineChain}","autores":"","instituciones":"","origen":"","funete":"","fb":1}'`);

    return articles;
  }

  getCountries(){
    return this.http.get(`${this.urlProject}assets/js/json/paises.json`);
  }

  allArticles(search: string): boolean{
    let all: boolean;

    (search === 'allArt')
    ? all = true
    : all = false;

    return all;
  }
}
