import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginadorService {

  total: number;
  count = 1;
  pFinal = 1;
  posicion: number;

  @Output() cambioTotal: EventEmitter<any> = new EventEmitter();
  @Output() cambioFinal: EventEmitter<any> = new EventEmitter();
  @Output() cambioPosicion: EventEmitter<any> = new EventEmitter();

  constructor() { }

  actualizarTotal(filtros: number) {
    this.total = filtros;
    this.cambioTotal.emit(this.total);
    console.log(this.total);
    this.calculaFinal(filtros);
  }

  actualizarFinal() {
    this.pFinal = this.total;
    this.cambioTotal.emit(this.pFinal);
  }

  actualizarPosicion(pagina: number) {
    this.posicion = pagina;
    this.cambioPosicion.emit(this.posicion);
  }

  calculaFinal(total: number) {
    if (Number.isInteger((total / 12))) {
      this.pFinal = (total / 12);
    } else {
      this.pFinal = Math.floor(total / 12) + 1;
    }
  }



}

