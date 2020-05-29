import { Component, OnInit } from '@angular/core';
import { Revistas } from '../../models/revistas';
import { Usuario } from '../../models/usuario';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { FiltrosRevistasService } from '../../services/filtros-revistas.service';
import { Total } from '../../models/total'
import { RevistasService } from '../../services/revistas.service'
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { number } from '@amcharts/amcharts4/core';
import { PaginadorService } from 'src/app/services/paginador.service';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})

export class PaginadorComponent implements OnInit {
  revistas: Array<Revistas> = new Array<Revistas>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();
  final: number;
  P = this.paginadorService.posicion;

  revistasResultado: [] = [];
  constructor(private RevistasInyectado: RevistasService, private Ruta: Router,
    private revistasService: RevistasService, private filtrosRevistasService: FiltrosRevistasService,
    private paginadorService: PaginadorService) { }

  ngOnInit(): void { //inicializa la busqueda con el primer metodo del servicio LeerJson 
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

    this.revistasService.getBusquedaRevistasPaginador(this.revistasService.palabra, this.paginadorService.pFinal).
    subscribe((data: any) =>{
      this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
      this.paginadorService.actualizarPosicion(this.paginadorService.pFinal);
    });
  }

  public primerPagina() {
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
    this.revistasService.getBusquedaRevistasPaginador(this.revistasService.palabra, 1).subscribe( (data: any) =>{
      this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
      this.paginadorService.actualizarPosicion(1);
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
    this.revistasService.getBusquedaRevistasPaginador(this.revistasService.palabra, this.paginadorService.posicion).
    subscribe( (data: any) =>{
      console.log('paginador', data);
      this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
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
    this.revistasService.getBusquedaRevistasPaginador(this.revistasService.palabra, this.paginadorService.posicion).
    subscribe( (data: any) =>{
      console.log('paginador', data);
      this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
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
  console.log(this.revistasService.palabra);
  this.revistasService.getBusquedaRevistasPaginador(this.filtrosRevistasService.palabra, pagina).subscribe((data: any) =>{
    this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
  });

}


}
