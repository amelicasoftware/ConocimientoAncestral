import { Component, OnInit } from '@angular/core';
import { PaginadorService } from '../../services/paginador.service';
import { Total } from '../../models/total'
import { FiltrosService } from '../../services/filtros.service';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Articulo } from '../../models/articulo';
@Component({
  selector: 'app-busqueda-palclav-vtab',
  templateUrl: './busqueda-palclav-vtab.component.html',
  styleUrls: ['./busqueda-palclav-vtab.component.css']
})
export class BusquedaPalclavVtabComponent implements OnInit {
  articulos: Array<Articulo> = new Array<Articulo>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();
  imagenR = 'assets/img/des.png';
  imagenN = 'assets/img/des.png';

  // filtros: FiltrosComponent = new FiltrosComponent(this.ArticuloInyectado, this);


  articulosResultado: [] = [];

  palabraBusqueda: string;
  totalResultados: number;
  palabra: string;

  constructor(private Ruta: Router,
              private articuloService: ServiosBusquedaService, private filtrosService: FiltrosService,
              private paginadorService: PaginadorService, private _route: ActivatedRoute) {}

              ngOnInit(): void {
                this.palabra = this._route.snapshot.paramMap.get('palabra');
                this.articuloService.setpalabra(this.palabra) 
                this.filtrosService.actualizarPalabra(this.palabra)
                this.articuloService.leerjsonPC().subscribe((articulosDesdeApi: any) => {
                  console.log(articulosDesdeApi) 
                  console.log(articulosDesdeApi.articulos.total)
                  // this.articulos = articulosDesdeApi.articulos.articulos;
                   this.total.total = articulosDesdeApi.articulos.total;
                  // if (Number.isInteger((this.total.total / 10))) {
                  //   this.total.final = (this.total.total / 10)
                  // } else {
                  //   this.total.final = Math.floor(this.total.total / 10) + 1
                  // }
                  // this.total.pos = this.articuloService.count
                  // console.log(this.articulos)
                  // console.log(this.total)
                  this.filtrosService.actualizarArticulos(articulosDesdeApi.articulos.articulos);
                  this.paginadorService.actualizarTotal(articulosDesdeApi.articulos.total);
                  this.paginadorService.actualizarPosicion(1);
                });
                
            
                this.filtrosService.cambioArticulos.subscribe(data2 => {
                  console.log('resutladosServicio', data2);
                  this.articulos = data2;
                });
                console.log("Coso Imprimiendo algo abr que es ",this.articuloService.getpalabra())
                 this.total.palabra = this.articuloService.getpalabra()
              }
            
            
              buscar(palabra: string) {
                console.log(palabra);
                this.total.palabra = palabra;
                this.filtrosService.palabra = palabra;
                this.filtrosService.actualizarPalabra(palabra)
                this.articuloService.setpalabra(palabra)
                this.articuloService.getBusquedaArticulosPalClav(palabra).subscribe((data: any) => {
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
                this.filtrosService.actualizarPalabra(palabra)
              }
            
            
              public ultimapagina(ultimapagina: number) {
                console.log(ultimapagina)
                let palabra = this.articuloService.getpalabra();
                console.log(palabra);
                this.articuloService.getPaginaFinalPalClav(palabra, ultimapagina).subscribe((data: any) => {
                  console.log(data);
                  this.articulos = data.articulos.articulos;
                  this.articuloService.setpalabra(palabra)
                  this.total.total = data.articulos.total;
                  if (Number.isInteger((this.total.total / 10))) {
                    this.total.final = (this.total.total / 10)
                    this.articuloService.setcount(this.total.final)
                  } else {
                    this.total.final = Math.floor(this.total.total / 10) + 1
                    this.articuloService.setcount(this.total.final)
                  }
                  this.total.pos = this.articuloService.count
                  this.articuloService.setfin(0)
                });
              }
            
            
              public posicionActual() {
                let posicion = this.articuloService.count
                console.log(posicion)
              }
            
              public primerPagina() {
            
                let palabra = this.articuloService.getpalabra();
                console.log(palabra);
                this.articuloService.getPaginaPPalClav(palabra).subscribe((data: any) => {
                  console.log(data);
                  this.articulos = data.articulos.articulos;
                  this.articuloService.setpalabra(palabra)
                  this.total.total = data.articulos.total;
                  if (Number.isInteger((this.total.total / 10))) {
                    this.total.final = (this.total.total / 10)
                    this.articuloService.setcount(1)
                  } else {
                    this.total.final = Math.floor(this.total.total / 10) + 1
                    this.articuloService.setcount(1)
                  }
                  this.total.pos = this.articuloService.count
                  this.articuloService.setfin(1)
                });
            
              }
            
              public getCount() {
                return this.articuloService.count
              }
              public getFin() {
                this.total.pos = this.articuloService.count
                return this.articuloService.fin
              }
            
              public incCount() {
            
                let pagina = this.articuloService.getcount();
                let d = this.total.total; //11 
                let division = d % 10; // division = 1 
                if (division == 0 && pagina <= (d / 10)) {
                  pagina = pagina + 1
                  if (pagina <= (d / 10)) { //boton de pagina siguiente no sera mostrado llgando al final
                    this.articuloService.setfin(1)
                  } else {
                    this.articuloService.setfin(0)
                  } //boton de pagina siguiente no sera mostrado llgando al final
                  this.articuloService.setcount(pagina)
                  this.articuloService.leerjsonPC().subscribe((articulosDesdeApi: any) => {
                    this.articulos = articulosDesdeApi.articulos.articulos
                  });
                } else {
                  if (!(Number.isInteger(d / 10)) && (pagina <= (d / 10))) {
                    pagina = pagina + 1
                    if (pagina <= (d / 10)) { //boton de pagina siguiente no sera mostrado llgando al final
                      this.articuloService.setfin(1)
                    } else {
                      this.articuloService.setfin(0)
                    }//boton de pagina siguiente no sera mostrado llgando al final
                    this.articuloService.setcount(pagina)
                    this.articuloService.leerjsonPC().subscribe((articulosDesdeApi: any) => {
                      this.articulos = articulosDesdeApi.articulos.articulos
                    });
                  } else {
                    this.articuloService.setfin(0)
                  }
                }
                console.log(pagina)
                this.total.pos = this.articuloService.count
              }
            
            
              public getDCount() {
                return this.articuloService.count
              }
              public incDCount() {
            
                this.articuloService.setfin(1)
                let pagina = this.articuloService.getcount();
                pagina = pagina - 1
            
                this.articuloService.setcount(pagina)
                this.articuloService.leerjsonPC().subscribe((articulosDesdeApi: any) => {
            
                  this.articulos = articulosDesdeApi.articulos.articulos;
            
                });
                this.total.pos = this.articuloService.count
              }
            
              limpiarDatos(){
                console.log('voy a limpiar');
                this.filtrosService.filtrosElegidos = [];
                const globos = [];
                this.filtrosService.actualizarGlobos(globos);
              }

              public reversa(campo: string, reversa: boolean){ 
                console.log(this.articuloService.getreversa());
                console.log(this.articuloService.getpalabraOrdenar());
                console.log(this.filtrosService.palabra);
                this.paginadorService.reversa = reversa;
                this.paginadorService.campo = campo;
                this.articuloService.setpalabraOrdenar(campo);
                if(this.articuloService.getreversa()){
                  // this.imagenNR = "assets/img/des.png";
                  this.articuloService.setreversa(false);
                  this.paginadorService.reversa = false;
                }else{
                  // this.imagenNR = "assets/img/as.png";
                  this.paginadorService.reversa = true;
                  this.articuloService.setreversa(true);
                }
                let palabra = this.filtrosService.palabra;
                this.articuloService.ordenarReversa(campo, palabra).subscribe((data: any) => {
                  this.articulos = data.articulos.articulos;
                  this.filtrosService.actualizarArticulos(data.articulos.articulos);
                  this.filtrosService.actualizarFiltros(data.filtros);
                  console.log(this.articulos);
                });
                this.cambioIcono(campo);
            
              }
            
              cambioIcono(campo: string){
                if(campo === 'nombreRevista' && this.paginadorService.reversa){
                  this.imagenR = "assets/img/as.png";
                }else if(campo === 'nombreRevista' && this.paginadorService.reversa === false){
                  this.imagenR = "assets/img/des.png";
                }
                if(campo === 'anio' && this.paginadorService.reversa){
                  this.imagenN = "assets/img/as.png";
                }else if(campo === 'anio' && this.paginadorService.reversa === false){
                  this.imagenN = "assets/img/des.png";
                }
              }
            }
            