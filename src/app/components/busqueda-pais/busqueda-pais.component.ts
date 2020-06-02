import { Component, OnInit, Input } from '@angular/core';
import { Articulo } from '../../models/articulo';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { Router } from '@angular/router';
import { FiltrosComponent } from '../filtros/filtros.component';
import { FiltrosService } from '../../services/filtros.service';
import { PaginadorService } from '../../services/paginador.service';
import { Total } from '../../models/total';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-busqueda-pais',
  templateUrl: './busqueda-pais.component.html',
  styleUrls: ['./busqueda-pais.component.css']
})
export class BusquedaPaisComponent implements OnInit {

  articulos: Array<Articulo> = new Array<Articulo>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();
  cvePais: number;
  // articulosResultado: [] = [];

  // palabraBusqueda: string;
  // totalResultados: number;
  nombrePais: string;

  constructor(private ArticuloInyectado: ServiosBusquedaService, private activatedRoute: ActivatedRoute,
              private articuloService: ServiosBusquedaService, private filtrosService: FiltrosService,
              private paginadorService: PaginadorService) {
                this.activatedRoute.params.subscribe( params =>{
                  this.cvePais = params['cvePais'];
                  console.log(this.cvePais);
                });
               }

  ngOnInit(): void {
    this.ArticuloInyectado.getArticulosXPais(this.cvePais, '').subscribe((articulosXPais: any) => {
      console.log(articulosXPais.articulos.total);
      console.log('estos son mis datos' , articulosXPais);
      this.total.total = articulosXPais.articulos.total;
      this.filtrosService.actualizarArticulos(articulosXPais.articulos.articulos);
      this.filtrosService.actualizarFiltros(articulosXPais.filtros);
      this.paginadorService.actualizarTotal(articulosXPais.articulos.total);
      this.paginadorService.actualizarPosicion(1);
      this.nombrePais = articulosXPais.filtros[2].elementos[0].nombre;
    });


    this.filtrosService.cambioArticulos.subscribe(data2 => {
      console.log('resutladosArticuloPais', data2);
      this.articulos = data2;
    });
    this.total.palabra = this.articuloService.getpalabra();
  }


  buscar(palabra: string, nombreBusqueda: string) {
    console.log(palabra);
    console.log(nombreBusqueda);
    this.total.palabra = palabra;
    this.filtrosService.palabra = palabra;
    this.articuloService.getArticulosXPais(this.cvePais, palabra).subscribe((data: any) => {
      console.log(data);
      this.filtrosService.actualizarArticulos(data.articulos.articulos);
      this.filtrosService.actualizarFiltros(data.filtros);
      const globos = [];
      this.filtrosService.actualizarGlobos(globos);
      this.filtrosService.filtrosElegidos = [];
      this.filtrosService.cadenafiltros = '';
      this.paginadorService.actualizarTotal(data.articulos.total);
      this.paginadorService.actualizarPosicion(1);
      this.total.total = data.articulos.total;
    });
    this.filtrosService.palabra = palabra;
  }

  limpiarDatos() {
    console.log('voy a limpiar');
    this.filtrosService.filtrosElegidos = [];
    const globos = [];
    this.filtrosService.actualizarGlobos(globos);
  }
}
