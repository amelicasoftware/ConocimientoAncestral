import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Article } from '../../models/Article.model';
import { ArticleResult } from '../../models/ArticleResult.model';
import { ArticleService } from '../../services/article.service';
import { FiledSort } from '../../models/filedSort.model';
import { Filter } from '../../models/Filter.model';
import { FilterChain } from '../../models/FilterChain.model';
import { FilterService } from '../../services/filter.service';
import { PaginationService } from '../../services/pagination.service';
import { Total } from '../../models/total.model';

@Component({
  selector: 'app-busqueda-palabra-clave',
  templateUrl: './busqueda-palabra-clave.component.html',
  styleUrls: ['./busqueda-palabra-clave.component.css']
})
export class BusquedaPalabraClaveComponent implements OnInit, OnDestroy {
  private positionSubscription$: Subscription;
  private finalPositionSubscription$: Subscription;
  private filtersSubscription$: Subscription;
  private filtersChainSubscription$: Subscription;
  private searchSubscription$: Subscription;
  private fieldSortSubscription$: Subscription;
  private subscriptionArray$: Array<Subscription> = [];

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
    this.search = this.route.snapshot.paramMap.get('keyword');
  }

  ngOnDestroy(): void {
    this.subscriptionArray$.forEach( (subscription: Subscription) => subscription.unsubscribe() );
  }

  ngOnInit(): void {
    this.total.palabra = this.search;

    this.filtersSubscription$ = this.filterService.filters$.subscribe(
      (filters: Array<Filter>) => this.filters = filters
    );

    this.finalPositionSubscription$ = this.paginationService.finalPosition$.pipe(
      delay(0)
    ).subscribe(
      (finalPosition: number) => this.finalPositionPage = finalPosition
    );

    this.positionSubscription$ = this.paginationService.position$.subscribe(
      (position: number) => {
        this.positionPage = position;

        this.articleService.getArticlesByKeyword(this.search, position, this.reverse, this.field, this.filtersChain).subscribe(
          (articles: ArticleResult) => {
            this.articles = articles.resultados;
            this.total.total = articles.totalResultados;
            this.totalResults = articles.totalResultados;
          }
        );
      }
    );

    this.filtersChainSubscription$ = this.filterService.filtersChain$.subscribe(
      (filtersChain: FilterChain) => {
        this.filtersChain = filtersChain;
        this.articleService.getArticlesByKeyword(
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

    this.searchSubscription$ = this.articleService.search$.subscribe(
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

        this.articleService.getArticlesByKeyword(search, 1, 0, 'relevancia', this.filtersChain).subscribe(
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

    this.fieldSortSubscription$ = this.articleService.filedSort$.subscribe(
      (fieldSort: FiledSort) => {
        this.field = fieldSort.field;
        this.reverse = fieldSort.reverse;

        this.articleService.getArticlesByKeyword(
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
      .getArticlesByKeyword(this.search, this.positionPage, 0, 'relevancia', this.filtersChain)
      .subscribe((articles: ArticleResult) => {
        this.articles = articles.resultados;
        this.total.total = articles.totalResultados;
        this.filterService.changeFilters(articles.filtros);
        this.totalResults = articles.totalResultados;
    });

    this.subscriptionArray$.push(this.positionSubscription$);
    this.subscriptionArray$.push(this.finalPositionSubscription$);
    this.subscriptionArray$.push(this.filtersSubscription$);
    this.subscriptionArray$.push(this.filtersChainSubscription$);
    this.subscriptionArray$.push(this.searchSubscription$);
    this.subscriptionArray$.push(this.fieldSortSubscription$);
  }

  public searchArticles(search: string): void {
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
