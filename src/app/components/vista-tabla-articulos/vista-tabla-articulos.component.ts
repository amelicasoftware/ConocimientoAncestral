import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo';
import { Usuario } from '../../models/usuario';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { Router } from '@angular/router';
import { FiltrosComponent } from '../filtros/filtros.component';
import { FiltrosService } from '../../services/filtros.service';
import { PaginadorService } from '../../services/paginador.service';
import { Total } from '../../models/total'
import { from } from 'rxjs';
import { number } from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-vista-tabla-articulos',
  templateUrl: './vista-tabla-articulos.component.html',
  styleUrls: ['./vista-tabla-articulos.component.css']
})
export class VistaTablaArticulosComponent implements OnInit {
  
  articulos: Array<Articulo> = new Array<Articulo>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();
  imagen = 'assets/img/des.png';

  articulosResultado: [] = [];

  palabraBusqueda: string;
  totalResultados: number;

  constructor(private ArticuloInyectado: ServiosBusquedaService, private Ruta: Router,
              private articuloService: ServiosBusquedaService, private filtrosService: FiltrosService,
              private paginadorService: PaginadorService) { }

  ngOnInit(): void {
    this.ArticuloInyectado.leerjson().subscribe((articulosDesdeApi: any) => {
      console.log(articulosDesdeApi.articulos.total);
      this.articulos = articulosDesdeApi.articulos.articulos;
      this.total.total = articulosDesdeApi.articulos.total;
      this.filtrosService.actualizarArticulos(articulosDesdeApi.articulos.articulos);
      this.filtrosService.actualizarFiltros(articulosDesdeApi.filtros);
   });

    this.filtrosService.cambioArticulos.subscribe(data2 => {
     console.log('resutladosServicio', data2);
     this.articulos = data2;
    });
    this.total.palabra = this.articuloService.getpalabra()
  }

  public reversa(campo: string, reversa: boolean){
    /*console.log(this.revistasService.getreversa());
    console.log(this.revistasService.getpalabraOrdenar());
    this.revistasService.setpalabraOrdenar(campo);
    if(this.revistasService.getreversa()){
      this.imagen = "assets/img/des.png";
      this.revistasService.setreversa(false);
    }else{
      this.imagen = "assets/img/as.png";
      this.revistasService.setreversa(true);
    }

    this.revistasService.ordenarReversa(campo).subscribe((data: any) => {
      this.revistas = data.revistas.revistas;
      this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
      this.filtrosRevistasService.actualizarFiltros(data.filtros);
      console.log(this.revistas);
    });*/

  }
}
