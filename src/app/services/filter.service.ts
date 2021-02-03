import { Injectable, EventEmitter } from '@angular/core';
import { Filtro } from '../models/Filtro';
import { FilterElement } from '../models/FilterElement';
import { FilterChain } from '../models/FilterChain';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filters$: EventEmitter<Array<Filtro>> = new EventEmitter<Array<Filtro>>();
  filtersChain$: EventEmitter<FilterChain> = new EventEmitter<FilterChain>();
  filtersSelected$: EventEmitter<Array<FilterElement>> = new EventEmitter<Array<FilterElement>>();
  filtersSelected: Array<FilterElement> = [];
  filtersChain: FilterChain = new FilterChain();

  constructor() { }

  public changeFilters(filters: Array<Filtro>){
    console.log('change filters');
    this.filters$.emit(filters);
  }

  public addFilter(filterElement: FilterElement, filterName: string){
    const deleteFilterActive: boolean = this.findFilterActive(filterElement.nombre, filterElement.clave);
    const element = {
      clave: filterElement.clave,
      nombre: filterElement.nombre,
      filtro: filterName,
      state: false
    };

    console.log(element);
    if (!deleteFilterActive){
      if (this.findFilterSelected(element.nombre, false)) {
        const index: number = this.getIndexFilterSelected(element.clave);
        this.filtersSelected.splice(index, 1);
      } else {
        this.filtersSelected.push(element);
      }
    }

    console.log(this.filtersSelected);
  }

  public applyFilters(){
    this.filtersChain.yearChain = this.buildChain('Año');
    this.filtersChain.disciplineChain = this.buildChain('Disciplina');
    this.filtersChain.countryChain = this.buildChain('País');
    this.filtersChain.languageChain = this.buildChain('Idioma');
    this.filtersChain.fontChain = this.buildChain('Fuente');
    console.log(this.filtersChain);
    /* if (this.filtersChain.countryChain
      || this.filtersChain.disciplineChain
      || this.filtersChain.fontChain
      || this.filtersChain.languageChain
      || this.filtersChain.yearChain
    ){
      this.filtersChain$.emit(this.filtersChain);
      this.filtersSelected$.emit(this.filtersSelected);
    }else{
      this.filtersChain$.emit(this.filtersChain);
      this.filtersSelected$.emit(this.filtersSelected);
    } */
    this.filtersChain$.emit(this.filtersChain);
    this.filtersSelected$.emit(this.filtersSelected);
  }

  public buildChain(filter: string): string{
    const filters: string[] = [];
    let filtersChain = '';

    this.filtersSelected.forEach((filterSelected: FilterElement) => {
      if (filterSelected.filtro === filter){
        filters.push(filterSelected.clave);
      }
    });

    filtersChain = filters.join('<<<');
    console.log(filtersChain);
    return filtersChain;
  }

  public activateFilters(element: FilterElement): boolean{
    if (this.filtersSelected.find((filterSelected: FilterElement) => filterSelected.nombre === element.nombre)) {
      return true;
    }else{
      return false;
    }
  }

  public showButton(filter: Filtro): boolean{
    if (filter.elementos.length > 5){
      return false;
    }else{
      return true;
    }
  }

  public showElements(filter: Filtro){
    if (!filter.hasOwnProperty('state')) {
      Object.defineProperty(filter, 'state', {
        value: false,
        writable: true
      });
    }

    filter.state
    ? Object.defineProperty(filter, 'state', { value: false })
    : Object.defineProperty(filter, 'state', { value: true });
  }

  public changeStatefiltersSelected(filtersSelected: Array<FilterElement>): Array<FilterElement>{
    filtersSelected.forEach(
      (filterSelected: FilterElement) => {
        filterSelected.state = true;
      }
    );
    return filtersSelected;
  }

  public findFilterActive(filterName: string, key: string): boolean{
    if (this.findFilterSelected(filterName, true)){
      const index: number = this.getIndexFilterSelected(key);
      this.filtersSelected.splice(index, 1);
      this.applyFilters();
      return true;
    }else{
      return false;
    }
  }

  public findFilterSelected(filterName: string, state: boolean): boolean{
    return this.filtersSelected.find(
        (filterSelected: FilterElement) => filterSelected.nombre === filterName && filterSelected.state === state
      )
      ? true
      : false;
  }

  public getIndexFilterSelected(key: string): number{
    return this.filtersSelected.findIndex((filterIndexSelected: FilterElement) => filterIndexSelected.clave === key);
  }
}
