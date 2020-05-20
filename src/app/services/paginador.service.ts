import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginadorService {

  total: number;
  @Output() cambioTotal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  actualizarTotal(filtros: number) {
    this.total = filtros;     
    this.cambioTotal.emit(this.total);     
    console.log(this.total);  
   }

}

