import { Component, OnInit } from '@angular/core';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { RevistasService } from '../../services/revistas.service';
import { Revistas } from '../../models/revistas';
import { FiltrosRevistasService } from '../../services/filtros-revistas.service';
import { Total } from '../../models/total';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';

@Component({
  selector: 'app-vista-tabla',
  templateUrl: './vista-tabla.component.html',
  styleUrls: ['./vista-tabla.component.css']
})

export class VistaTablaComponent implements OnInit {

  revistas: Array<Revistas> = new Array<Revistas>();
  total: Total = new Total();

  constructor(private RevistasInyectado: RevistasService, private revistasService: RevistasService,
              private filtrosRevistasService: FiltrosRevistasService) { }

  ngOnInit(): void {   
    let palabra = this.revistasService.getpalabra();
    this.total.palabra = this.revistasService.getpalabra();
    this.revistasService.getBusquedaRevistas(palabra).subscribe((revistasDesdeApi: any) => {
      console.log(revistasDesdeApi.revistas.total)
      this.revistas = revistasDesdeApi.revistas.revistas;
      this.total.total = revistasDesdeApi.revistas.total;
      this.filtrosRevistasService.actualizarRevistas(revistasDesdeApi.revistas.revistas);
      //this.paginadorService.actualizarTotal(revistasDesdeApi.revistas.total);
    });
    this.revistasService.leerjson().subscribe((data: any) => {
      console.log(data.revistas.total)
      this.revistas = data.revistas.revistas;
      this.total.total = data.revistas.total;
    });
    this.filtrosRevistasService.cambioRevistas.subscribe(data2 => {
      console.log('resutladosServicio', data2);
      this.revistas = data2;
    });
  }

  public reversa(campo: string, reversa: boolean){
    console.log(this.revistasService.getreversa());
    console.log(this.revistasService.getpalabraOrdenar());
    this.revistasService.setpalabraOrdenar(campo);
    if(this.revistasService.getreversa()){
      this.revistasService.setreversa(false);
    }else{
      this.revistasService.setreversa(true);
    }

    this.revistasService.ordenarReversa(campo).subscribe((data: any) => {
     
      this.revistas = data.revistas.revistas;
      this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
      console.log(this.revistas);
    });

  }
}