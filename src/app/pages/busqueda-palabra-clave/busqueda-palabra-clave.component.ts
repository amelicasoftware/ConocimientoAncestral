import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { FilterService } from '../../services/filter.service';
import { PaginationService } from '../../services/pagination.service';
import { ActivatedRoute } from '@angular/router';
import { Total } from '../../models/total';
import { Article } from '../../models/article';
import { Filtro } from '../../models/Filtro';
import { FilterChain } from '../../models/FilterChain';
import { FiledSort } from '../../models/filedSort';

@Component({
  selector: 'app-busqueda-palabra-clave',
  templateUrl: './busqueda-palabra-clave.component.html',
  styleUrls: ['./busqueda-palabra-clave.component.css']
})
export class BusquedaPalabraClaveComponent implements OnInit, OnDestroy {
  positionSubscription: Subscription;
  finalPositionSubscription: Subscription;
  filtersSubscription: Subscription;
  filtersChainSubscription: Subscription;
  searchSubscription: Subscription;
  fieldSortSubscription: Subscription;

  total: Total = new Total();
  loading: boolean;

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

  constructor(
    private articleService: ArticleService,
    private filterService: FilterService,
    private paginationService: PaginationService,
    private route: ActivatedRoute
  ) {
    this.loading = true;
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
    this.loading = false;
    this.search = this.route.snapshot.paramMap.get('keyword');
    this.total.palabra = this.search;

    this.filtersSubscription = this.filterService.filters$.subscribe(
      (filters: Array<Filtro>) => this.filters = filters
    );

    this.finalPositionSubscription = this.paginationService.finalPosition$.subscribe(
      (finalPosition: number) => this.finalPositionPage = finalPosition
    );

    this.positionSubscription = this.paginationService.position$.subscribe(
      (position: number) => {
        this.positionPage = position;
        this.loading = false;

        this.articleService.getArticlesByKeyword(this.search, position, this.reverse, this.field, this.filtersChain).subscribe(
          (articles: any) => {
            this.articles = articles.articulos.articulos;
            this.total.total = articles.articulos.total;
            this.totalResults = articles.articulos.total;
            this.loading = true;
          }
        );
      }
    );

    this.filtersChainSubscription = this.filterService.filtersChain$.subscribe(
      (filtersChain: FilterChain) => {
        this.loading = false;
        this.filtersChain = filtersChain;
        this.articleService.getArticlesByKeyword(
          this.search,
          1,
          this.reverse,
          this.field,
          this.filtersChain
        ).subscribe(
          (articles: any) => {
            this.positionPage = 1;
            this.articles = articles.articulos.articulos;
            this.total.total = articles.articulos.total;
            this.filterService.changeFilters(articles.filtros);
            this.paginationService.changeInitialPosition();
            this.paginationService.changeFinalPosition(articles.articulos.total, 'articles');
            this.totalResults = articles.articulos.total;
            this.loading = true;
          }
        );
      }
    );

    this.searchSubscription = this.articleService.search$.subscribe(
      (search: string) => {
        this.loading = false;
        this.positionPage = 1;
        this.search = search;
        this.total.palabra = search;
        this.filtersChain = new FilterChain();

        this.articleService.getArticlesByKeyword(search, 1, false, '', this.filtersChain).subscribe(
          (articles: any) => {
            this.articles = articles.articulos.articulos;
            this.total.total = articles.articulos.total;
            this.filterService.changeFilters(articles.filtros);
            this.paginationService.changeInitialPosition();
            this.paginationService.changeFinalPosition(articles.articulos.total, 'articles');
            this.totalResults = articles.articulos.total;
            this.loading = true;
          }
        );
      }
    );

    this.fieldSortSubscription = this.articleService.filedSort$.subscribe(
      (fieldSort: FiledSort) => {
        this.loading = false;
        this.field = fieldSort.field;
        this.reverse = fieldSort.reverse;

        this.articleService.getArticlesByKeyword(
          this.search,
          this.positionPage,
          fieldSort.reverse,
          fieldSort.field,
          this.filtersChain
        ).subscribe(
          (articles: any) => {
            this.articles = articles.articulos.articulos;
            this.loading = true;
          }
        );
      }
    );


    this.articleService
      .getArticlesByKeyword(this.search, this.positionPage, false, '', this.filtersChain)
      .subscribe((articles: any) => {
        this.articles = articles.articulos.articulos;
        this.total.total = articles.articulos.total;
        this.filterService.changeFilters(articles.filtros);
        this.totalResults = articles.articulos.total;
        this.loading = true;
    });
  }

  public searchArticles(search: string){
    this.filterService.filtersSelected = [];
    this.filterService.filtersSelected$.emit([]);
    this.articleService.changeSearch(search);
  }

  public changeView(state: boolean){
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
