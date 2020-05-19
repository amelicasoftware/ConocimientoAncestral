import { Component, OnInit, Input } from '@angular/core';
import { Articulo } from '../../models/articulo';
import { Usuario } from '../../models/usuario';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { Router } from '@angular/router';
import { FiltrosComponent } from '../filtros/filtros.component';
import { FiltrosService } from '../../services/filtros.service';

import { Total } from '../../models/total'
import { from } from 'rxjs';
import { number } from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-busqueda-general',
  templateUrl: './busqueda-general.component.html',
  styleUrls: ['./busqueda-general.component.css']
})
export class BusquedaGeneralComponent implements OnInit {
  articulos: Array<Articulo> = new Array<Articulo>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();
  

  // filtros: FiltrosComponent = new FiltrosComponent(this.ArticuloInyectado, this);


  articulosResultado: [] = [];

  palabraBusqueda: string;

  constructor(private ArticuloInyectado: ServiosBusquedaService, private Ruta: Router,
              private articuloService: ServiosBusquedaService, private filtrosService: FiltrosService) { }

  ngOnInit(): void {
    this.ArticuloInyectado.leerjson().subscribe((articulosDesdeApi:any) => {
      console.log(articulosDesdeApi.articulos.total)
      this.articulos = articulosDesdeApi.articulos.articulos;
       this.total.total =  articulosDesdeApi.articulos.total;
       if(Number.isInteger((this.total.total/10))){
          this.total.final = (this.total.total/10)
       }else{
        this.total.final = Math.floor(this.total.total/10)+1
       }
       this.total.pos = this.articuloService.count
console.log(this.articulos)
console.log(this.total)
    });

    this.filtrosService.cambioArticulos.subscribe(data2 => {
      console.log('resutladosServicio', data2);
      this.articulos = data2;
    });
    this.total.palabra = this.articuloService.getpalabra()
  }


  buscar(palabra: string) {
    this.articuloService.total.total = 0 
    this.articuloService.total.final = 0 
    this.articuloService.count = 1
    this.articuloService.fin = 1
    this.total.palabra = palabra  
    console.log(palabra);
    this.filtrosService.palabra = palabra;
    this.articuloService.getBusquedaArticulos(palabra).subscribe((data: any) => {
      console.log(data);
      this.filtrosService.actualizarArticulos(data.articulos.articulos);
      this.filtrosService.actualizarFiltros(data.filtros);
      const globos = [];
      this.filtrosService.actualizarGlobos(globos);
      this.filtrosService.filtrosElegidos = [];
      this.articulos = data.articulos.articulos;
      this.articuloService.setpalabra(palabra) 
      console.log(palabra)     
      this.total.total =  data.articulos.total;
      if(Number.isInteger((this.total.total/10))){
         this.total.final = (this.total.total/10)
      }else{
       this.total.final = Math.floor(this.total.total/10)+1
      }  
    });   
  }


public ultimapagina(ultimapagina:number){
  console.log(ultimapagina)
  let palabra = this.articuloService.getpalabra();  
    console.log(palabra);
   this.articuloService.getPaginaFinal(palabra, ultimapagina).subscribe((data: any) => {
      console.log(data);
      this.articulos = data.articulos.articulos;
      this.articuloService.setpalabra(palabra)      
      this.total.total =  data.articulos.total;
      if(Number.isInteger((this.total.total/10))){
         this.total.final = (this.total.total/10)
         this.articuloService.setcount(this.total.final)
      }else{
       this.total.final = Math.floor(this.total.total/10)+1
       this.articuloService.setcount(this.total.final)
      }  
      this.total.pos = this.articuloService.count
      this.articuloService.setfin(0)
    });
}


public posicionActual(){
  let posicion = this.articuloService.count 
console.log(posicion)
}

public primerPagina(){

  let palabra = this.articuloService.getpalabra();  
    console.log(palabra);
   this.articuloService.getPaginaP(palabra).subscribe((data: any) => {
      console.log(data);
      this.articulos = data.articulos.articulos;
      this.articuloService.setpalabra(palabra)      
      this.total.total =  data.articulos.total;
      if(Number.isInteger((this.total.total/10))){
         this.total.final = (this.total.total/10)
         this.articuloService.setcount(1)
      }else{
       this.total.final = Math.floor(this.total.total/10)+1
       this.articuloService.setcount(1)
      }  
      this.total.pos = this.articuloService.count
      this.articuloService.setfin(1)
    });
    
}

public getCount() { 
  return this.articuloService.count 
}
public getFin(){
  this.total.pos = this.articuloService.count
  return this.articuloService.fin
}

public incCount(){ 
 
  let pagina = this.articuloService.getcount();
  let d = this.total.total; //11 
  let division = d%10; // division = 1 
  if(division == 0 && pagina <= (d/10)){
    pagina = pagina + 1 
    if(pagina <= (d/10)){ //boton de pagina siguiente no sera mostrado llgando al final
      this.articuloService.setfin(1)
    }else{
      this.articuloService.setfin(0)
    } //boton de pagina siguiente no sera mostrado llgando al final
    this.articuloService.setcount(pagina)
    this.ArticuloInyectado.leerjson().subscribe((articulosDesdeApi:any) => {
    this.articulos = articulosDesdeApi.articulos.articulos  
    });
  }else{  
    if(!(Number.isInteger(d/10)) && (pagina <= (d/10))){
        pagina = pagina + 1 
        if(pagina <= (d/10)){ //boton de pagina siguiente no sera mostrado llgando al final
          this.articuloService.setfin(1)
        }else{
          this.articuloService.setfin(0)
        }//boton de pagina siguiente no sera mostrado llgando al final
        this.articuloService.setcount(pagina)
        this.ArticuloInyectado.leerjson().subscribe((articulosDesdeApi:any) => {  
        this.articulos = articulosDesdeApi.articulos.articulos     
        });
    }else{
      this.articuloService.setfin(0)
    }    
  }
  console.log(pagina)
  this.total.pos = this.articuloService.count
}


public getDCount() { 
  return this.articuloService.count 
}
public incDCount(){ 

  this.articuloService.setfin(1)
  let pagina = this.articuloService.getcount();
  pagina = pagina - 1
 
  this.articuloService.setcount(pagina)
  this.ArticuloInyectado.leerjson().subscribe((articulosDesdeApi:any) => {
 
  this.articulos = articulosDesdeApi.articulos.articulos;

  });
  this.total.pos = this.articuloService.count
}
}
