import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnDestroy {
  private finalPageSubscription$: Subscription;
  private initialPageSubscription$: Subscription;

  @Input() totalResult: number;
  final: number;
  actualPage = 1;

  constructor( private paginationService: PaginationService ) { }

  ngOnInit(): void {

    this.initialPageSubscription$ = this.paginationService.initialPosition$.subscribe(
      (initialPage: number) => this.actualPage = initialPage
    );

    this.finalPageSubscription$ = this.paginationService.finalPosition$.subscribe(
      (finalPage: number) => this.final = finalPage
    );

    this.paginationService.changeFinalPosition(this.totalResult, 'articles');
  }

  ngOnDestroy(): void {
    console.log('Destroy component New Pagination');
    this.finalPageSubscription$.unsubscribe();
    this.initialPageSubscription$.unsubscribe();
  }

  public initialPage(){
    this.actualPage = 1;
    this.paginationService.changePosition(this.actualPage);
  }

  public leftArrow(){
    this.actualPage = this.actualPage - 1;
    this.paginationService.changePosition(this.actualPage);
  }

  public nextOrpreviousPage(page: number){
    this.actualPage = page;
    this.paginationService.changePosition(this.actualPage);
  }

  public rightArrowPage() {
    this.actualPage = this.actualPage + 1;
    this.paginationService.changePosition(this.actualPage);
  }

  public finalPage(){
    this.actualPage = this.final;
    this.paginationService.changePosition(this.actualPage);
  }

}
