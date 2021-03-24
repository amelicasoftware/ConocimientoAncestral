import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Country } from 'src/app/models/country';
import { FiledSort } from '../../models/filedSort';
import { Filtro } from '../../models/Filtro';
import { FilterChain } from '../../models/FilterChain';
import { FilterService } from '../../services/filter.service';
import { PaginationService } from '../../services/pagination.service';
import { Total } from '../../models/total';

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
  filters: Array<Filtro> = new Array<Filtro>();
  filtersChain: FilterChain = new FilterChain();
  listCountries: Array<Country> = new Array<Country>();
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
      (filters: Array<Filtro>) => this.filters = filters
    );

    this.finalPositionSubscription = this.paginationService.finalPosition$.subscribe(
      (finalPosition: number) => this.finalPositionPage = finalPosition
    );

    this.positionSubscription = this.paginationService.position$.subscribe(
      (position: number) => {
        this.positionPage = position;

        this.articleService.getArticlesByCountry(this.search, position, this.reverse, this.field, this.filtersChain).subscribe(
          (articles: any) => {
            this.articles = articles.articulos.articulos;
            this.total.total = articles.articulos.total;
            this.totalResults = articles.articulos.total;
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

    this.searchSubscription = this.articleService.search$.subscribe(
      (search: string) => {
        this.positionPage = 1;
        this.search = search;
        this.total.palabra = search;
        this.filtersChain = new FilterChain();

        this.articleService.getArticlesByCountry(search, 1, false, '', this.filtersChain).subscribe(
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
          (articles: any) => {
            this.articles = articles.articulos.articulos;
          }
        );
      }
    );

    this.articleService
      .getArticlesByCountry(this.search, this.positionPage, false, '', this.filtersChain)
      .pipe(
        finalize(
          () => this.articleService.getCountries().subscribe(
            (countries: Array<Country>) => this.listCountries = countries
          )
        )
      )
      .subscribe((articles: any) => {
        this.articles = articles.articulos.articulos;
        this.total.total = articles.articulos.total;
        this.filterService.changeFilters(articles.filtros);
        this.totalResults = articles.articulos.total;
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
