import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Filter } from '../../models/Filter.model';
import { FilterElement } from '../../models/FilterElement.model';
import { FilterService } from '../../services/filter.service';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {
  filtersSubscription: Subscription;

  @Input() filters: Array<Filter>;
  filtersSelected: Array<FilterElement> = [];

  constructor(
    private filterServive: FilterService
  ) { }

  ngOnDestroy(): void {
    this.filtersSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.filtersSubscription = this.filterServive.filters$.subscribe(
      (filters: Array<Filter>) => this.filters = filters
    );
  }

  public applyFilters(){
    this.filterServive.applyFilters();
  }

  public showElements(filter: Filter){
    this.filterServive.showElements(filter);
  }

  public activateFilters(element: FilterElement): boolean{
    const activate: boolean = this.filterServive.activateFilters(element);
    return activate;
  }

  public addFilter(filterElement: FilterElement, filterName: string){
    this.filterServive.addFilter(filterElement, filterName);
  }

  public showButton(filter: Filter): boolean{
    const show: boolean = this.filterServive.showButton(filter);
    return show;
  }

}
