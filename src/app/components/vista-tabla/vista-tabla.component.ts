import { Component, OnInit } from '@angular/core';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { RevistasService } from '../../services/revistas.service';
import { Revistas } from '../../models/revistas';
import { FiltrosRevistasService } from '../../services/filtros-revistas.service';
import { Total } from '../../models/total';

@Component({
  selector: 'app-vista-tabla',
  templateUrl: './vista-tabla.component.html',
  styleUrls: ['./vista-tabla.component.css']
})

export class VistaTablaComponent implements OnInit {

  revistas: Array<Revistas> = new Array<Revistas>();
  total: Total = new Total();

  constructor(private RevistasInyectado: RevistasService, private revistasService: RevistasService,
              private filtrosRevistasService: FiltrosRevistasService) { }

  ngOnInit(): void {
    let palabra = this.revistasService.getpalabra();
    this.total.palabra = this.revistasService.getpalabra();
    this.revistasService.getBusquedaRevistas(palabra).subscribe((revistasDesdeApi: any) => {
      console.log(revistasDesdeApi.revistas.total)
      this.revistas = revistasDesdeApi.revistas.revistas;
      this.total.total = revistasDesdeApi.revistas.total;
      this.filtrosRevistasService.actualizarRevistas(revistasDesdeApi.revistas.revistas);
    });
  }
}