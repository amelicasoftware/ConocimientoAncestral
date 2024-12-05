import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../../models/Article.model';
import { Country } from '../../models/Country.model';
import { ArticleService } from '../../services/article.service';
import { ArticleResult } from '../../models/ArticleResult.model';
import { FilterService } from '../../services/filter.service';
import { ErrorService } from '../../services/error.service';
import { PaginationService } from '../../services/pagination.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterChain } from '../../models/FilterChain.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-busqueda-pais',
  templateUrl: './busqueda-pais.component.html',
  styleUrls: ['./busqueda-pais.component.css']
})
export class BusquedaPaisComponent implements OnInit, OnDestroy {
  private finalPositionSubscription$: Subscription;
  private positionSubscription$: Subscription;
  private searchSubscription$: Subscription;
  private filtersChainSubscription$: Subscription;
  private subscriptionArray: Array<Subscription> = [];

  filtersChain: FilterChain = {
    yearChain: '',
    disciplineChain: '',
    countryChain: '',
    languageChain: '',
    fontChain: ''
  };

  listCountries: Array<Country> = new Array<Country>();
  articles: Array<Article> = new Array<Article>();
  country: string;
  countryError: string;
  countryId: string;
  countryIdCopy: string;

  finalPositionPage: number;
  totalResults: number;

  positionPage = 1;
  view = true;
  results = true;
  imgTable = 'assets/img/icons/tabla-desactivada.png';
  imgList = 'assets/img/icons/lista-activada.png';

  constructor(
    private articleService: ArticleService,
    private errorService: ErrorService,
    private filterService: FilterService,
    private paginationService: PaginationService,
    private routeService: ActivatedRoute
  ) {
    this.countryId = this.routeService.snapshot.paramMap.get('countryId');
  }

  ngOnInit(): void {
    this.finalPositionSubscription$ = this.paginationService.finalPosition$.subscribe(
      (finalPosition: number) => this.finalPositionPage = finalPosition
    );

    this.positionSubscription$ = this.paginationService.position$.subscribe(
      (position: number) => {
        this.positionPage = position;

        this.articleService.getArticlesByCountry(this.countryId, position, this.filtersChain).subscribe(
          (articles: ArticleResult) => {
            this.articles = articles.resultados;
            this.paginationService.changeFinalPosition(articles.totalResultados, 'articles');
          }
        );
      }
    );

    this.searchSubscription$ = this.articleService.search$.subscribe(
      (search: string) => {
        this.positionPage = 1;
        this.countryIdCopy = this.countryId;
        this.countryId = search;
        this.filtersChain = {
          yearChain: '',
          disciplineChain: '',
          countryChain: '',
          languageChain: '',
          fontChain: ''
        };

        this.articleService.getArticlesByCountry(search, 1, this.filtersChain).subscribe(
          (articles: ArticleResult) => {
            if (this.articleService.articlesExists(articles.resultados.length)){
              this.articles = articles.resultados;
              this.totalResults = articles.totalResultados;
              this.country = articles.resultados[0].nombrePais;
              this.filterService.changeFilters(articles.filtros);
              this.paginationService.changeInitialPosition();
              this.paginationService.changeFinalPosition(articles.totalResultados, 'articles');
            } else {
              this.errorService.showErrorSearchs(`No existen resultados para ${this.countryError}. Sugerencias: Prueba con una búsqueda nueva`);
              this.countryId = this.countryIdCopy;
            }
          }
        );
      }
    );

    this.filtersChainSubscription$ = this.filterService.filtersChain$.subscribe(
      (filtersChain: FilterChain) => {
        this.filtersChain = filtersChain;
        this.articleService.getArticlesByCountry(
          this.countryId,
          1,
          this.filtersChain
        ).subscribe(
          (articles: ArticleResult) => {
            if (this.articleService.articlesExists(articles.resultados.length)){
              this.positionPage = 1;
              this.articles = articles.resultados;
              this.totalResults = articles.totalResultados;
              this.filterService.changeFilters(articles.filtros);
              this.paginationService.changeInitialPosition();
              this.paginationService.changeFinalPosition(articles.totalResultados, 'articles');
            } else {
              this.errorService.showErrorSearchs('No existen resultados para la combinación de filtros');
              this.searchArticlesByCountry(this.countryId);
            }
          }
        );
      }
    );

    this.articleService.getArticlesByCountry(this.countryId, 1, this.filtersChain).pipe(
      finalize(
        () => this.articleService.getCountries().subscribe(
          (countries: Array<Country>) => this.listCountries = countries
        )
      )
    ).subscribe(
      (articles: ArticleResult) => {
        if (this.articleService.articlesExists(articles.resultados.length)){
          this.articles = articles.resultados;
          this.country = articles.resultados[0].nombrePais;
          this.totalResults = articles.totalResultados;
          this.filterService.changeFilters(articles.filtros);
          this.paginationService.changeFinalPosition(articles.totalResultados, 'articles');
        }
      }
    );

    this.subscriptionArray.push(this.finalPositionSubscription$);
    this.subscriptionArray.push(this.positionSubscription$);
    this.subscriptionArray.push(this.searchSubscription$);
    this.subscriptionArray.push(this.filtersChainSubscription$);
  }

  ngOnDestroy(): void {
    console.log('Destroy page busqueda pais');
    this.filterService.cleanFiltersSelected();
    this.subscriptionArray.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  searchArticlesByCountry(countrySelected: string): void {
    this.countryError = this.listCountries.find((country: Country) => country.clave === countrySelected).name;
    this.filterService.cleanFiltersSelected();
    this.articleService.changeSearch(countrySelected);
  }

  changeView(state: boolean): void {
    this.view = state;
    if (state) {
      this.imgTable = 'assets/img/icons/tabla-desactivada.png';
      this.imgList = 'assets/img/icons/lista-activada.png';
    } else {
      this.imgTable = 'assets/img/icons/tabla-activada.png';
      this.imgList = 'assets/img/icons/lista-desactivada.png';
    }
  }

  goUp(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

}
