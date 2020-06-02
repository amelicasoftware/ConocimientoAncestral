import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { FiltrosService } from '../../services/filtros.service';
import { PaginadorService } from '../../services/paginador.service';
import { Total } from '../../models/total';

@Component({
  selector: 'app-paginador-articulos',
  templateUrl: './paginador-articulos.component.html',
  styleUrls: ['./paginador-articulos.component.css']
})
export class PaginadorArticulosComponent implements OnInit {

  final: number;
  total: Total = new Total();
  P = this.paginadorService.posicion;

  revistasResultado: [] = [];
  constructor(private Ruta: Router, private articulosService: ServiosBusquedaService,
              private filtrosService: FiltrosService, private paginadorService: PaginadorService) { }

  ngOnInit(): void { 
  //  console.log("##########################",this.articulosService.getpalabra())
    //inicializa la busqueda con el primer metodo del servicio LeerJson 
    // this.revistasService.leerjson().subscribe((revistasDesdeApi: any) => {
    //   console.log(revistasDesdeApi.revistas.total);
      // this.revistas = revistasDesdeApi.revistas.revistas;
      // this.total.total = revistasDesdeApi.revistas.total;
      // this.paginadorService.total = revistasDesdeApi.revistas.total;
      // console.log('total', this.total.total);
      // if (Number.isInteger((this.total.total / 12))) {
      //   this.total.final = (this.total.total / 12)
      // } else {
      //   this.total.final = Math.floor(this.total.total / 12) + 1
      // // }
      // this.paginadorService.calculaFinal(revistasDesdeApi.revistas.total);
      // this.paginadorService.posicion = 1;
      // console.log(this.revistas)
      // console.log(this.total)
      // this.filtrosRevistasService.actualizarRevistas(revistasDesdeApi.revistas.revistas);
    // });
    // this.total.palabra = this.revistasService.getpalabra();
    // this.filtrosRevistasService.cambioRevistas.subscribe(data2 => {
    //   console.log('resutladosServicio', data2);
    //   this.revistas = data2;
    // });

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
    // console.log(ultimapagina)
    // let palabra = this.revistasService.palabra;
    // console.log(palabra);
    // this.revistasService.getPaginaFinal(palabra, ultimapagina).subscribe((data: any) => {
    //   console.log(data);
    //   this.revistas = data.revistas.revistas;
    //   this.revistasService.setpalabra(palabra)
    //   this.total.total = data.revistas.total;
    //   if (Number.isInteger((this.total.total / 12))) {
    //     this.total.final = (this.total.total / 12)
    //     this.revistasService.setcount(this.total.final)
    //   } else {
    //     this.total.final = Math.floor(this.total.total / 12) + 1
    //     this.revistasService.setcount(this.total.final)
    //   }
    //   this.total.pos = this.revistasService.count
    //   this.revistasService.setfin(0)
    // });

    this.articulosService.getBusquedaArticulosPaginador(this.articulosService.palabra, this.paginadorService.pFinal).
    subscribe((data: any) =>{
      console.log(data);
      this.filtrosService.actualizarArticulos(data.articulos.articulos);
      this.paginadorService.actualizarPosicion(this.paginadorService.pFinal);
    });
  }

  public primerPagina() {
    console.log("Palabra recibida en el boton de primer palabra",this.articulosService.getpalabra())
    // let palabra = this.revistasService.getpalabra();
    // console.log(palabra);
    // this.revistasService.getPaginaP(palabra).subscribe((data: any) => {
    //   console.log(data);
    //   this.revistas = data.revistas.revistas;
    //   this.revistasService.setpalabra(palabra)
    //   this.total.total = data.revistas.total;
    //   if (Number.isInteger((this.total.total / 12))) {
    //     this.total.final = (this.total.total / 12)
    //     this.revistasService.setcount(1)
    //   } else {
    //     this.total.final = Math.floor(this.total.total / 12) + 1
    //     this.revistasService.setcount(1)
    //   }
    //   this.total.pos = this.revistasService.count
    //   this.revistasService.setfin(1)
    // });
    this.articulosService.getBusquedaArticulosPaginador(this.articulosService.palabra, 1).subscribe((data: any) =>{
      this.filtrosService.actualizarArticulos(data.articulos.articulos);
      this.paginadorService.actualizarPosicion(1);
          this.filtrosService.actualizarPalabra(this.articulosService.getpalabra());
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

  posicion(){
    return this.paginadorService.posicion;
  }

  public incCount() {
    // let pagina = this.revistasService.getcount();
    // let d = this.total.total; //11 
    // let division = d % 12; // division = 1 
    // if (division == 0 && pagina <= (d / 12)) {
    //   pagina = pagina + 1
    //   if (pagina <= (d / 12)) { //boton de pagina siguiente no sera mostrado llgando al final
    //     this.revistasService.setfin(1)
    //   } else {
    //     this.revistasService.setfin(0)
    //   } //boton de pagina siguiente no sera mostrado llgando al final
    //   this.revistasService.setcount(pagina)
    //   this.RevistasInyectado.leerjson().subscribe((revistasDesdeApi: any) => {
    //     this.revistas = revistasDesdeApi.revistas.revistas
    //     this.filtrosRevistasService.actualizarRevistas(revistasDesdeApi.revistas.revistas);
    //   });
    // } else {
    //   if (!(Number.isInteger(d / 12)) && (pagina <= (d / 12))) {
    //     pagina = pagina + 1
    //     if (pagina <= (d / 12)) { //boton de pagina siguiente no sera mostrado llgando al final
    //       this.revistasService.setfin(1)
    //     } else {
    //       this.revistasService.setfin(0)
    //     }//boton de pagina siguiente no sera mostrado llgando al final
    //     this.revistasService.setcount(pagina)
    //     this.RevistasInyectado.leerjson().subscribe((revistasDesdeApi: any) => {
    //       this.revistas = revistasDesdeApi.revistas.revistas
    //       this.filtrosRevistasService.actualizarRevistas(revistasDesdeApi.revistas.revistas);
    //     });
    //   } else {
    //     this.revistasService.setfin(0)
    //   }
    // }
    // console.log(pagina)
    // this.total.pos = this.revistasService.count
    console.log('siguiente');
    this.paginadorService.actualizarPosicion(this.paginadorService.posicion + 1);
    this.articulosService.getBusquedaArticulosPaginador(this.articulosService.palabra, this.paginadorService.posicion).
    subscribe( (data: any) =>{
      console.log('paginador', data);
      this.filtrosService.actualizarArticulos(data.articulos.articulos);
    });
  }


  // public getDCount() {
  //   return this.revistasService.count
  // }
  public incDCount() {
    // this.revistasService.setfin(1)
    // let pagina = this.revistasService.getcount();
    // pagina = pagina - 1

    // this.revistasService.setcount(pagina)
    // this.RevistasInyectado.leerjson().subscribe((revistasDesdeApi: any) => {

    //   this.revistas = revistasDesdeApi.revistas.revistas;

    // });
    // this.total.pos = this.revistasService.count
    console.log('anterior');
    this.paginadorService.actualizarPosicion(this.paginadorService.posicion - 1);
    this.articulosService.getBusquedaArticulosPaginador(this.articulosService.palabra, this.paginadorService.posicion).
    subscribe( (data: any) =>{
      console.log('paginador', data);
      this.filtrosService.actualizarArticulos(data.articulos.articulos);
    });
  }

  public numerosPag(pagina: number, final: number) {
   
  //   if (pagina === final) {
  //     this.revistasService.setfin(0)
  //   } else {
  //     this.revistasService.setfin(1)
  //   }
  //   this.revistasService.setcount(pagina)
  //   this.RevistasInyectado.leerjson().subscribe((revistasDesdeApi: any) => {
  //     this.revistas = revistasDesdeApi.revistas.revistas;
  //   });
  //   this.total.pos = this.revistasService.count
  // }

  this.paginadorService.actualizarPosicion(pagina);
  this.filtrosService.actualizarPalabra(this.articulosService.getpalabra())
  this.articulosService.getBusquedaArticulosPaginador(this.filtrosService.palabra, pagina).subscribe((data: any) =>{
    this.filtrosService.actualizarArticulos(data.articulos.articulos);   
  });

}

}
