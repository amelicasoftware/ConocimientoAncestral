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


  ngOnInit(): void { //inicializa la busqueda con el primer metodo del servicio LeerJson 
    this.revistasService.leerjson().subscribe((revistasDesdeApi: any) => {
      console.log(revistasDesdeApi);
      // this.revistas = revistasDesdeApi.revistas.revistas;
      this.paginadorService.actualizarTotal(revistasDesdeApi.revistas.total, 'revistas');
      // if (Number.isInteger((this.total.total / 12))) {
      //   this.total.final = (this.total.total / 12)
      // } else {
      //   this.total.final = Math.floor(this.total.total / 12) + 1
      // }
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
    // this.revistasService.total.total = 0
    // this.revistasService.total.final = 0
    // this.revistasService.count = 1
    // this.revistasService.fin = 1
    this.total.palabra = palabra;
    // this.filtrosRevistasService.a
    console.log(palabra);
    this.revistasService.getBusquedaRevistas(palabra).subscribe((data: any) => {
      console.log(data);
      // this.revistas = data.revistas.revistas;
      // this.revistasService.setpalabra(palabra)
      // console.log(palabra)
      this.total.total = data.revistas.total;
      // if (Number.isInteger((this.total.total / 12))) {
      //   this.total.final = (this.total.total / 12)
      // } else {
      //   this.total.final = Math.floor(this.total.total / 12) + 1
      // }
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


  // public posicionActual() {
  //   let posicion = this.revistasService.count
  //   console.log(posicion)
  // }

  // public ultimapagina(ultimapagina: number) {
  //   console.log(ultimapagina)
  //   let palabra = this.revistasService.getpalabra();
  //   console.log(palabra);
  //   this.revistasService.getPaginaFinal(palabra, ultimapagina).subscribe((data: any) => {
  //     console.log(data);
  //     this.revistas = data.revistas.revistas;
  //     this.revistasService.setpalabra(palabra)
  //     this.total.total = data.revistas.total;
  //     if (Number.isInteger((this.total.total / 12))) {
  //       this.total.final = (this.total.total / 12)
  //       this.revistasService.setcount(this.total.final)
  //     } else {
  //       this.total.final = Math.floor(this.total.total / 12) + 1
  //       this.revistasService.setcount(this.total.final)
  //     }
  //     this.total.pos = this.revistasService.count
  //     this.revistasService.setfin(0)
  //   });
  // }

  // public primerPagina() {
  //   let palabra = this.revistasService.getpalabra();
  //   console.log(palabra);
  //   this.revistasService.getPaginaP(palabra).subscribe((data: any) => {
  //     console.log(data);
  //     this.revistas = data.revistas.revistas;
  //     this.revistasService.setpalabra(palabra)
  //     this.total.total = data.revistas.total;
  //     if (Number.isInteger((this.total.total / 12))) {
  //       this.total.final = (this.total.total / 12)
  //       this.revistasService.setcount(1)
  //     } else {
  //       this.total.final = Math.floor(this.total.total / 12) + 1
  //       this.revistasService.setcount(1)
  //     }
  //     this.total.pos = this.revistasService.count
  //     this.revistasService.setfin(1)
  //   });
  // }


  // public getCount() {
  //   return this.revistasService.count
  // }



  // public getFin() {
  //   this.total.pos = this.revistasService.count
  //   return this.revistasService.fin
  // }

  // public incCount() {
  //   let pagina = this.revistasService.getcount();
  //   let d = this.total.total; //11 
  //   let division = d % 12; // division = 1 
  //   if (division == 0 && pagina <= (d / 12)) {
  //     pagina = pagina + 1
  //     if (pagina <= (d / 12)) { //boton de pagina siguiente no sera mostrado llgando al final
  //       this.revistasService.setfin(1)
  //     } else {
  //       this.revistasService.setfin(0)
  //     } //boton de pagina siguiente no sera mostrado llgando al final
  //     this.revistasService.setcount(pagina)
  //     this.RevistasInyectado.leerjson().subscribe((revistasDesdeApi: any) => {
  //       this.revistas = revistasDesdeApi.revistas.revistas
  //       this.filtrosRevistasService.actualizarRevistas(revistasDesdeApi.revistas.revistas);
  //     });
  //   } else {
  //     if (!(Number.isInteger(d / 12)) && (pagina <= (d / 12))) {
  //       pagina = pagina + 1
  //       if (pagina <= (d / 12)) { //boton de pagina siguiente no sera mostrado llgando al final
  //         this.revistasService.setfin(1)
  //       } else {
  //         this.revistasService.setfin(0)
  //       }//boton de pagina siguiente no sera mostrado llgando al final
  //       this.revistasService.setcount(pagina)
  //       this.RevistasInyectado.leerjson().subscribe((revistasDesdeApi: any) => {
  //         this.revistas = revistasDesdeApi.revistas.revistas
  //         this.filtrosRevistasService.actualizarRevistas(revistasDesdeApi.revistas.revistas);
  //       });
  //     } else {
  //       this.revistasService.setfin(0)
  //     }
  //   }
  //   console.log(pagina)
  //   this.total.pos = this.revistasService.count
  // }


  // public getDCount() {
  //   return this.revistasService.count
  // }
  // public incDCount() {
  //   this.revistasService.setfin(1)
  //   let pagina = this.revistasService.getcount();
  //   pagina = pagina - 1

  //   this.revistasService.setcount(pagina)
  //   this.RevistasInyectado.leerjson().subscribe((revistasDesdeApi: any) => {

  //     this.revistas = revistasDesdeApi.revistas.revistas;

  //   });
  //   this.total.pos = this.revistasService.count
  // }

  // public numerosPag(pagina: number, final: number) {

  //   if (pagina == final) {
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


}
