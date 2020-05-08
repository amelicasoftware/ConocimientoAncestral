import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo';
import { Usuario } from '../../models/usuario';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busquedarev',
  templateUrl: './busquedarev.component.html',
  styleUrls: ['./busquedarev.component.css']
})
export class BusquedarevComponent implements OnInit {
  articulos: Array<Articulo> = new Array<Articulo>();

  articulosResultado: [] = [];
  constructor(private ArticuloInyectado: ServiosBusquedaService, private Ruta: Router,
    private articuloService: ServiosBusquedaService) { }

ngOnInit(): void {
this.ArticuloInyectado.leerjson().subscribe((articulosDesdeApi:any) => {
console.log(articulosDesdeApi)
this.articulos = articulosDesdeApi.articulos.registros;
console.log(this.articulos)
});
}



buscar(palabra: string) {
console.log(palabra);
this.articuloService.getBusquedaArticulos(palabra).subscribe((data: any) => {
console.log(data);
this.articulos = data.articulos.registros;
});
}
}

