import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { FiledSort } from '../../models/filedSort';
import { Filtro } from '../../models/Filtro';
import { FilterChain } from '../../models/FilterChain';
import { FilterService } from '../../services/filter.service';
import { PaginationService } from '../../services/pagination.service';
import { Total } from '../../models/total';

@Component({
  selector: 'app-busqueda-general',
  templateUrl: './busqueda-general.component.html',
  styleUrls: ['./busqueda-general.component.css']
})
export class BusquedaGeneralComponent implements OnInit, OnDestroy {

  positionSubscription: Subscription;
  finalPositionSubscription: Subscription;
  filtersSubscription: Subscription;
  filtersChainSubscription: Subscription;
  searchSubscription: Subscription;
  fieldSortSubscription: Subscription;

  total: Total = new Total();

  articles: Array<Article> = new Array<Article>();
  filters: Array<Filtro> = new Array<Filtro>();
  filtersChain: FilterChain = new FilterChain();
  search: string;
  finalPositionPage: number;
  totalResults: number;
  positionPage = 1;
  view = true;
  imgList = 'assets/img/lista.png';
  imgTable = 'assets/img/tarjetas-act.png';
  reverse = false;
  field = '';
  all = false;

  constructor(
    private articleService: ArticleService,
    private filterService: FilterService,
    private paginationService: PaginationService,
    private route: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.positionSubscription.unsubscribe();
    this.finalPositionSubscription.unsubscribe();
    this.filtersSubscription.unsubscribe();
    this.filtersChainSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
    this.fieldSortSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.search = this.route.snapshot.paramMap.get('palabra');
    this.all = this.articleService.allArticles(this.route.snapshot.paramMap.get('palabra'));
    console.log(this.all);
    this.total.palabra = this.search;

    this.searchSubscription = this.articleService.search$.subscribe(
      (search: string) => {
        this.positionPage = 1;
        this.search = search;
        this.total.palabra = search;
        this.filtersChain = new FilterChain();

        this.articleService.getArticles(search, 1, false, '', this.filtersChain, this.all).subscribe(
          (articles: any) => {
            this.articles = articles.articulos.articulos;
            this.total.total = articles.articulos.total;
            this.filterService.changeFilters(articles.filtros);
            this.paginationService.changeInitialPosition();
            this.paginationService.changeFinalPosition(articles.articulos.total, 'articles');
            this.totalResults = articles.articulos.total;
          }
        );
      }
    );

    this.positionSubscription = this.paginationService.position$.subscribe(
      (position: number) => {
        this.positionPage = position;

        this.articleService.getArticles(this.search, position, this.reverse, this.field, this.filtersChain, this.all).subscribe(
          (articles: any) => {
            this.articles = articles.articulos.articulos;
            this.total.total = articles.articulos.total;
            this.totalResults = articles.articulos.total;
          }
        );
      }
    );

    this.finalPositionSubscription = this.paginationService.finalPosition$.subscribe(
      (finalPosition: number) => this.finalPositionPage = finalPosition
    );

    this.filtersSubscription = this.filterService.filters$.subscribe(
      (filters: Array<Filtro>) => this.filters = filters
    );

    this.filtersChainSubscription = this.filterService.filtersChain$.subscribe(
      (filtersChain: FilterChain) => {
        this.filtersChain = filtersChain;
        this.articleService.getArticles(
          this.search,
          1,
          this.reverse,
          this.field,
          this.filtersChain,
          this.all
        ).subscribe(
          (articles: any) => {
            this.positionPage = 1;
            this.articles = articles.articulos.articulos;
            this.total.total = articles.articulos.total;
            this.filterService.changeFilters(articles.filtros);
            this.paginationService.changeInitialPosition();
            this.paginationService.changeFinalPosition(articles.articulos.total, 'articles');
            this.totalResults = articles.articulos.total;
          }
        );
      }
    );

    this.fieldSortSubscription = this.articleService.filedSort$.subscribe(
      (fieldSort: FiledSort) => {
        this.field = fieldSort.field;
        this.reverse = fieldSort.reverse;

        this.articleService.getArticles(
          this.search,
          this.positionPage,
          fieldSort.reverse,
          fieldSort.field,
          this.filtersChain,
          this.all
        ).subscribe(
          (articles: any) => {
            this.articles = articles.articulos.articulos;
          }
        );
      }
    );

    this.articleService
      .getArticles(this.search, this.positionPage, false, '', this.filtersChain, this.all)
      .subscribe((articles: any) => {
        this.articles = articles.articulos.articulos;
        this.total.total = articles.articulos.total;
        this.filterService.changeFilters(articles.filtros);
        this.totalResults = articles.articulos.total;
    });

  }

  public searchArticles(search: string): void {
    this.all = false;
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
