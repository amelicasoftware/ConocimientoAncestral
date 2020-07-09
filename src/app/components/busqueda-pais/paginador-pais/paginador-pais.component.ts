import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiosBusquedaService } from '../../../services/servios-busqueda.service';
import { FiltrosService } from '../../../services/filtros.service';
import { PaginadorService } from '../../../services/paginador.service';
import { Total } from '../../../models/total';


@Component({
  selector: 'app-paginador-pais',
  templateUrl: './paginador-pais.component.html',
  styleUrls: ['./paginador-pais.component.css']
})
export class PaginadorPaisComponent implements OnInit {

  final: number;
  total: Total = new Total();
  P = this.paginadorService.posicion;

  revistasResultado: [] = [];
  constructor(private Ruta: Router, private articulosService: ServiosBusquedaService,
    private filtrosService: FiltrosService, private paginadorService: PaginadorService) { }

  ngOnInit(): void {
    this.paginadorService.cambioFinal.subscribe(data2 => {
      console.log('filtrosServicio', data2);
      this.final = data2;
    });

    this.paginadorService.cambioPosicion.subscribe(data2 => {
      console.log('filtrosServicio', data2);
      this.P = data2;
    });

  }

  public posicionActual() {
    let posicion = this.paginadorService.posicion;
    console.log(posicion);
  }

  public ultimapagina(ultimapagina: number) {    
    this.paginadorService.cambioloading(false)
    this.articulosService.getBusquedaArticulosPaginadorPais(this.paginadorService.pFinal, this.filtrosService.cvePais).
      subscribe((data: any) => {
        console.log(data);
        this.filtrosService.actualizarArticulos(data.articulos.articulos);
        this.paginadorService.actualizarPosicion(this.paginadorService.pFinal);
        this.paginadorService.cambioloading(true)
      });
  }

  public primerPagina() {
    this.paginadorService.cambioloading(false)
    console.log("Palabra recibida en el boton de primer palabra", this.articulosService.getpalabra());
    this.articulosService.getBusquedaArticulosPaginadorPais(1, this.filtrosService.cvePais).subscribe((data: any) => {
      this.filtrosService.actualizarArticulos(data.articulos.articulos);
      this.paginadorService.actualizarPosicion(1);
      this.filtrosService.actualizarPalabra(this.articulosService.getpalabra());
      this.paginadorService.cambioloading(true)
    });

  }


  public getCount() {
    // console.log('pagina', this.paginadorService.posicion);
    return this.paginadorService.posicion;
  }



  public getFin() {
    // this.total.pos = this.revistasService.count
    // console.log('paginaFinal', this.paginadorService.pFinal);
    return this.paginadorService.pFinal;
  }

  posicion() {
    return this.paginadorService.posicion;
  }

  public incCount() {
    this.paginadorService.cambioloading(false)
    console.log('siguiente');
    this.paginadorService.actualizarPosicion(this.paginadorService.posicion + 1);
    this.articulosService.getBusquedaArticulosPaginadorPais(this.paginadorService.posicion, this.filtrosService.cvePais).
      subscribe((data: any) => {
        console.log('paginador', data);
        this.filtrosService.actualizarArticulos(data.articulos.articulos);
        this.paginadorService.cambioloading(true)
      });
  }

  public incDCount() {
    this.paginadorService.cambioloading(false)
    console.log('anterior');
    this.paginadorService.actualizarPosicion(this.paginadorService.posicion - 1);
    this.articulosService.getBusquedaArticulosPaginadorPais(this.paginadorService.posicion, this.filtrosService.cvePais).
      subscribe((data: any) => {
        console.log('paginador', data);
        this.filtrosService.actualizarArticulos(data.articulos.articulos);
        this.paginadorService.cambioloading(true)
      });
  }

  public numerosPag(pagina: number, final: number) {
    this.paginadorService.cambioloading(false)
    this.paginadorService.actualizarPosicion(pagina);
    this.filtrosService.actualizarPalabra(this.articulosService.getpalabra())
    this.articulosService.getBusquedaArticulosPaginadorPais(pagina, this.filtrosService.cvePais).subscribe((data: any) => {
      this.filtrosService.actualizarArticulos(data.articulos.articulos);
      this.paginadorService.cambioloading(true)
    });

  }
}
