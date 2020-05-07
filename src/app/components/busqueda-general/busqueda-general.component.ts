import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo';
import { Usuario } from '../../models/usuario';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busqueda-general',
  templateUrl: './busqueda-general.component.html',
  styleUrls: ['./busqueda-general.component.css']
})
export class BusquedaGeneralComponent implements OnInit {

  articulos: Array<Articulo> = new Array<Articulo>();

  articulosResultado: [] = [];

  constructor(private ArticuloInyectado: ServiosBusquedaService, private Ruta: Router,
              private articuloService: ServiosBusquedaService) { }

  ngOnInit(): void {
    this.ArticuloInyectado.leerjson().subscribe((articulosDesdeApi) => {
      this.articulos = articulosDesdeApi;

    });
  }

  irAlDetalle(articulo: Articulo) {
    this.ArticuloInyectado.articulo = articulo;
    this.Ruta.navigateByUrl('/articulodetalle');
  }

  buscar(palabra: string) {
    console.log(palabra);
    this.articuloService.getBusquedaArticulos(palabra).subscribe((data: any) => {
      console.log(data);
      this.articulos = data;
    });
  }
}
