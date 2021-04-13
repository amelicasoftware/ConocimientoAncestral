import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Article } from '../../models/Article.model';
import { ArticleResult } from '../../models/ArticleResult.model';
import { ArticleService } from '../../services/article.service';
import { Country } from 'src/app/models/country.model';
import { FiledSort } from '../../models/filedSort.model';
import { Filter } from '../../models/Filter.model';
import { FilterChain } from '../../models/FilterChain.model';
import { FilterService } from '../../services/filter.service';
import { PaginationService } from '../../services/pagination.service';
import { Total } from '../../models/total.model';

@Component({
  selector: 'app-busqueda-pais',
  templateUrl: './busqueda-pais.component.html',
  styleUrls: ['./busqueda-pais.component.css']
})
export class BusquedaPaisComponent implements OnInit, OnDestroy {
  positionSubscription: Subscription;
  finalPositionSubscription: Subscription;
  filtersSubscription: Subscription;
  filtersChainSubscription: Subscription;
  searchSubscription: Subscription;
  fieldSortSubscription: Subscription;

  total: Total = new Total();

  articles: Array<Article> = new Array<Article>();
  filters: Array<Filter> = new Array<Filter>();
  filtersChain: FilterChain = {
    yearChain: '',
    disciplineChain: '',
    countryChain: '',
    languageChain: '',
    fontChain: ''
  };

  listCountries: Array<Country> = new Array<Country>();
  search: string;
  finalPositionPage: number;
  totalResults: number;
  positionPage = 1;
  view = true;
  imgList = 'assets/img/lista.png';
  imgTable = 'assets/img/tarjetas-act.png';
  reverse = 0;
  field = 'relevancia';

  constructor(
    private articleService: ArticleService,
    private filterService: FilterService,
    private paginationService: PaginationService,
    private route: ActivatedRoute
  ) {
    const key = 'cvePais';
    this.route.params.subscribe((params) => {
      this.search = params[key];
      this.total.palabra = params[key];
    });
  }

  ngOnDestroy(): void {
    this.positionSubscription.unsubscribe();
    this.finalPositionSubscription.unsubscribe();
    this.filtersSubscription.unsubscribe();
    this.filtersChainSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
    this.fieldSortSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.filtersSubscription = this.filterService.filters$.subscribe(
      (filters: Array<Filter>) => this.filters = filters
    );

    this.finalPositionSubscription = this.paginationService.finalPosition$.pipe(
      delay(0)
    ).subscribe(
      (finalPosition: number) => this.finalPositionPage = finalPosition
    );

    this.positionSubscription = this.paginationService.position$.subscribe(
      (position: number) => {
        this.positionPage = position;

        this.articleService.getArticlesByCountry(this.search, position, this.reverse, this.field, this.filtersChain).subscribe(
          (articles: ArticleResult) => {
            this.articles = articles.resultados;
            this.total.total = articles.totalResultados;
            this.totalResults = articles.totalResultados;
          }
        );
      }
    );

    this.filtersChainSubscription = this.filterService.filtersChain$.subscribe(
      (filtersChain: FilterChain) => {
        this.filtersChain = filtersChain;
        this.articleService.getArticlesByCountry(
          this.search,
          1,
          this.reverse,
          this.field,
          this.filtersChain
        ).subscribe(
          (articles: ArticleResult) => {
            this.positionPage = 1;
            this.articles = articles.resultados;
            this.total.total = articles.totalResultados;
            this.filterService.changeFilters(articles.filtros);
            this.paginationService.changeInitialPosition();
            this.paginationService.changeFinalPosition(articles.totalResultados, 'articles');
            this.totalResults = articles.totalResultados;
          }
        );
      }
    );

    this.searchSubscription = this.articleService.search$.subscribe(
      (search: string) => {
        this.positionPage = 1;
        this.search = search;
        this.total.palabra = search;
        this.filtersChain = {
          yearChain: '',
          disciplineChain: '',
          countryChain: '',
          languageChain: '',
          fontChain: ''
        };

        this.articleService.getArticlesByCountry(search, 1,  0, 'relevancia', this.filtersChain).subscribe(
          (articles: ArticleResult) => {
            this.articles = articles.resultados;
            this.total.total = articles.totalResultados;
            this.filterService.changeFilters(articles.filtros);
            this.paginationService.changeInitialPosition();
            this.paginationService.changeFinalPosition(articles.totalResultados, 'articles');
            this.totalResults = articles.totalResultados;
          }
        );
      }
    );

    this.fieldSortSubscription = this.articleService.filedSort$.subscribe(
      (fieldSort: FiledSort) => {
        this.field = fieldSort.field;
        this.reverse = fieldSort.reverse;

        this.articleService.getArticlesByCountry(
          this.search,
          this.positionPage,
          fieldSort.reverse,
          fieldSort.field,
          this.filtersChain
        ).subscribe(
          (articles: ArticleResult) => {
            this.articles = articles.resultados;
          }
        );
      }
    );

    this.articleService
      .getArticlesByCountry(this.search, this.positionPage,  0, 'relevancia', this.filtersChain)
      .pipe(
        finalize(
          () => this.articleService.getCountries().subscribe(
            (countries: Array<Country>) => this.listCountries = countries
          )
        )
      )
      .subscribe((articles: ArticleResult) => {
        this.articles = articles.resultados;
        this.total.total = articles.totalResultados;
        this.filterService.changeFilters(articles.filtros);
        this.totalResults = articles.totalResultados;
    });
  }

  public searchArticlesByCountry(search: string): void {
    this.filterService.cleanFiltersSelected();
    this.articleService.changeSearch(search);
  }

  public changeView(state: boolean): void {
    this.view = state;
    if (state) {
      this.imgList = 'assets/img/lista.png';
      this.imgTable = 'assets/img/tarjetas-act.png';
    } else {
      this.imgTable = 'assets/img/tarjetas.png';
      this.imgList = 'assets/img/lista-act.png';
    }
  }

}
