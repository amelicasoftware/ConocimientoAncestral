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
  selector: 'app-busquedarev',
  templateUrl: './busquedarev.component.html',
  styleUrls: ['./busquedarev.component.css']
})
export class BusquedarevComponent implements OnInit {
  revistas: Array<Revistas> = new Array<Revistas>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();
  totalResultados: number;


  revistasResultado: [] = [];
  constructor(private RevistasInyectado: RevistasService, private Ruta: Router,
    private revistasService: RevistasService, private filtrosRevistasService: FiltrosRevistasService,
    private paginadorService: PaginadorService,) { }


  ngOnInit(): void {
    this.revistasService.leerjson().subscribe((revistasDesdeApi: any) => {
      console.log(revistasDesdeApi);
      this.paginadorService.actualizarTotal(revistasDesdeApi.revistas.total, 'revistas');
      this.paginadorService.actualizarTotal(revistasDesdeApi.revistas.total, 'revistas');
      this.paginadorService.actualizarPosicion(1);
      console.log('Pposiscion', this.paginadorService.posicion);
      console.log('Ptotal', this.paginadorService.total);
      console.log('Pfinal', this.paginadorService.pFinal);
      this.filtrosRevistasService.actualizarRevistas(revistasDesdeApi.revistas.revistas);
      this.filtrosRevistasService.actualizarFiltros(revistasDesdeApi.filtros);
      this.total.total = revistasDesdeApi.revistas.total;
    });

    this.total.palabra = this.revistasService.getpalabra();
    this.filtrosRevistasService.cambioRevistas.subscribe(data2 => {
      console.log('resutladosServicio', data2);
      this.revistas = data2;
    });
    this.paginadorService.cambioTotal.subscribe(data => {
      console.log('pruebababb202', data);
      this.totalResultados = data;
    });
  }



  buscar(palabra: string) {
    this.total.palabra = palabra;
    console.log(palabra);
    this.revistasService.getBusquedaRevistas(palabra).subscribe((data: any) => {
      console.log(data);
      this.total.total = data.revistas.total;
      this.filtrosRevistasService.actualizarFiltros(data.filtros);
      this.filtrosRevistasService.filtrosElegidos = [];
      this.filtrosRevistasService.palabra = palabra;
      this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
      const globos = [];
      this.filtrosRevistasService.actualizarGlobos(globos);
      this.filtrosRevistasService.cadenaFitros = '';
      this.paginadorService.actualizarTotal(data.revistas.total, 'revistas');
      this.paginadorService.actualizarPosicion(1);
    });
  }


}
