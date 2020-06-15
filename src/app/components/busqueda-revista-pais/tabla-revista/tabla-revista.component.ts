import { Component, OnInit, Input } from '@angular/core';
import { Revistas } from '../../../models/revistas';
import { Total } from '../../../models/total';
import { FiltrosRevistasService } from '../../../services/filtros-revistas.service';

@Component({
  selector: 'app-tabla-revista',
  templateUrl: './tabla-revista.component.html',
  styleUrls: ['./tabla-revista.component.css']
})
export class TablaRevistaComponent implements OnInit {

  @Input() revistas: Array<Revistas> = new Array<Revistas>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();

  imagenNR = 'assets/img/des.png';
  imagenMI = 'assets/img/des.png';

  constructor(private filtrosRevistasService: FiltrosRevistasService) { }

  ngOnInit(): void {
    this.filtrosRevistasService.cambioRevistas.subscribe( revistas =>{
      this.revistas = revistas;
    });
  }

  reversa(nombre, estado){

  }

}
