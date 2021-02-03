import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterElement } from '../../models/FilterElement';
import { FilterService } from '../../services/filter.service';
import { Filtro } from '../../models/Filtro';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {
  filtersSubscription: Subscription;

  @Input() filters: Array<Filtro>;
  filtersSelected: Array<FilterElement> = [];

  constructor(
    private filterServive: FilterService
  ) { }

  ngOnDestroy(): void {
    this.filtersSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.filtersSubscription = this.filterServive.filters$.subscribe(
      (filters: Array<Filtro>) => this.filters = filters
    );
  }

  public applyFilters(){
    this.filterServive.applyFilters();
  }

  public showElements(filter: Filtro){
    this.filterServive.showElements(filter);
  }

  public activateFilters(element: FilterElement): boolean{
    const activate: boolean = this.filterServive.activateFilters(element);
    return activate;
  }

  public addFilter(filterElement: FilterElement, filterName: string){
    this.filterServive.addFilter(filterElement, filterName);
  }

  public showButton(filter: Filtro): boolean{
    const show: boolean = this.filterServive.showButton(filter);
    return show;
  }

}
