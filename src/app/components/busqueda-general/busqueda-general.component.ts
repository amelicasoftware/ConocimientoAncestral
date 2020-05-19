import { Component, OnInit, Input } from '@angular/core';
import { Articulo } from '../../models/articulo';
import { Usuario } from '../../models/usuario';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { Router } from '@angular/router';
import { FiltrosComponent } from '../filtros/filtros.component';
import { FiltrosService } from '../../services/filtros.service';


@Component({
  selector: 'app-busqueda-general',
  templateUrl: './busqueda-general.component.html',
  styleUrls: ['./busqueda-general.component.css']
})
export class BusquedaGeneralComponent implements OnInit {

  articulos: Array<Articulo> = new Array<Articulo>();

  // filtros: FiltrosComponent = new FiltrosComponent(this.ArticuloInyectado, this);


  articulosResultado: [] = [];

  palabraBusqueda: string;

  constructor(private ArticuloInyectado: ServiosBusquedaService, private Ruta: Router,
              private articuloService: ServiosBusquedaService, private filtrosService: FiltrosService) { }

  ngOnInit(): void {
    this.ArticuloInyectado.leerjson().subscribe((articulosDesdeApi:any) => {
      console.log(articulosDesdeApi);
      this.articulos = articulosDesdeApi.articulos.articulos;
      console.log(this.articulos);
    });
    this.filtrosService.cambioArticulos.subscribe(data2 => {
      console.log('resutladosServicio', data2);
      this.articulos = data2;
    });
  }

  irAlDetalle(articulo: Articulo) {
    this.ArticuloInyectado.articulo = articulo;
    this.Ruta.navigateByUrl('/articulodetalle');
  }

  buscar(palabra: string) {
    console.log(palabra);
    this.filtrosService.palabra = palabra;
    this.articuloService.getBusquedaArticulos(palabra).subscribe((data: any) => {
      console.log(data);
      this.filtrosService.actualizarArticulos(data.articulos.articulos);
      this.filtrosService.actualizarFiltros(data.filtros);
      const globos = [];
      this.filtrosService.actualizarGlobos(globos);
      this.filtrosService.filtrosElegidos = [];
    });
    this.palabraBusqueda = palabra;
  }

}
