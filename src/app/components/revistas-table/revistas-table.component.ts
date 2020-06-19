import { Component, OnInit } from '@angular/core';
import { Revistas } from '../../models/revistas';
import { Usuario } from '../../models/usuario';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { FiltrosRevistasService } from '../../services/filtros-revistas.service';
import { Total } from '../../models/total';
import { RevistasService } from '../../services/revistas.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { number } from '@amcharts/amcharts4/core';
import { PaginadorService } from '../../services/paginador.service';


@Component({
  selector: 'app-revistas-table',
  templateUrl: './revistas-table.component.html',
  styleUrls: ['./revistas-table.component.css']
})
export class RevistasTableComponent implements OnInit {
  revistas: Array<Revistas> = new Array<Revistas>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();


  revistasResultado: [] = [];
  constructor(private RevistasInyectado: RevistasService, private Ruta: Router,
    private revistasService: RevistasService, private filtrosRevistasService: FiltrosRevistasService,
    private paginadorService: PaginadorService, ) { }


  ngOnInit(): void {
    this.revistasService.leerjson().subscribe((revistasDesdeApi: any) => {
      console.log(revistasDesdeApi);     
      this.paginadorService.total = revistasDesdeApi.revistas.total;    
      this.paginadorService.actualizarTotal(revistasDesdeApi.revistas.total, 'revistas');
      this.paginadorService.actualizarPosicion(1);
      console.log('Pposiscion', this.paginadorService.posicion);
      console.log('Ptotal', this.paginadorService.total);
      console.log('Pfinal', this.paginadorService.pFinal);
      this.filtrosRevistasService.actualizarRevistas(revistasDesdeApi.revistas.revistas);
      this.filtrosRevistasService.actualizarFiltros(revistasDesdeApi.filtros);
    });
    this.filtrosRevistasService.cambioRevistas.subscribe(data2 => {
      console.log('resutladosServicio', data2);
      this.revistas = data2;
    });
    this.total.palabra = this.filtrosRevistasService.palabra;
    this.total.total = this.paginadorService.total;
  }

  buscar(palabra: string) {
    console.log(palabra);
    this.total.palabra = palabra;
    this.filtrosRevistasService.palabra = palabra;
    this.revistasService.getBusquedaRevistas(palabra).subscribe((data: any) => {
      console.log(data);
      this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
      this.filtrosRevistasService.actualizarFiltros(data.filtros);
      const globos = [];
      this.filtrosRevistasService.actualizarGlobos(globos);
      this.filtrosRevistasService.filtrosElegidos = [];
      this.filtrosRevistasService.cadenaFitros = '';
      this.paginadorService.actualizarTotal(data.revistas.total, 'revistas');
      this.paginadorService.actualizarPosicion(1);
      this.total.total = data.revistas.total;
    });
    this.paginadorService.reversa = false;
    this.filtrosRevistasService.actualizarPalabra(palabra);
  }

}
