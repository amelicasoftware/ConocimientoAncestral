import { Component, OnInit, Input } from '@angular/core';
import { Articulo } from '../../../models/articulo';
import { Total } from '../../../models/total';
import { FiltrosService } from '../../../services/filtros.service';

@Component({
  selector: 'app-tabla-articulo',
  templateUrl: './tabla-articulo.component.html',
  styleUrls: ['./tabla-articulo.component.css']
})
export class TablaArticuloComponent implements OnInit {

  @Input() articulos: Array<Articulo> = new Array<Articulo>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();

  imagenR = 'assets/img/des.png';
  imagenN = 'assets/img/des.png';

  constructor(private filtrosService: FiltrosService) { }

  ngOnInit(): void {
    // this.filtrosService.cambioArticulos.subscribe( articulos =>{
    //   this.articulos = articulos;
    // });
  }

  public reversa(campo: string, reversa: boolean){

  }

}
