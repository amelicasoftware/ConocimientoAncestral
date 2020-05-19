import { Component, OnInit } from '@angular/core';
import { Revistas } from '../../models/revistas';
import { Usuario } from '../../models/usuario';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { RevistasService } from '../../services/revistas.service'
import { Router } from '@angular/router';
import { FiltrosRevistasService } from '../../services/filtros-revistas.service';

@Component({
  selector: 'app-busquedarev',
  templateUrl: './busquedarev.component.html',
  styleUrls: ['./busquedarev.component.css']
})
export class BusquedarevComponent implements OnInit {
  revistas: Array<Revistas> = new Array<Revistas>();

  revistasResultado: [] = [];

  constructor(private RevistasInyectado: RevistasService, private Ruta: Router,
              private revistasService: RevistasService, private filtrosRevistasService: FiltrosRevistasService) { }



  ngOnInit(): void {
    this.RevistasInyectado.leerjson().subscribe((revistasDesdeApi: any) => {
      console.log(revistasDesdeApi)
      this.revistas = revistasDesdeApi.revistas.revistas;
      console.log(this.revistas)
    });

    this.filtrosRevistasService.cambioRevistas.subscribe(data2 => {
      console.log('filtrosServicio', data2);
      this.revistas = data2;
    });
  }



  buscar(palabra: string) {
    console.log(palabra);
    this.revistasService.getBusquedaRevista(palabra).subscribe((data: any) => {
      console.log(data);
      this.revistas = data.revistas.revistas;
    });
  }
}

