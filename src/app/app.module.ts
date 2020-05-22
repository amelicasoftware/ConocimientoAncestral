import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { UltimosArticulosComponent } from './components/ultimos-articulos/ultimos-articulos.component';
//servicios
import { HttpClientModule } from '@angular/common/http';
import { TituloArticuloPipe } from './pipes/titulo-articulo.pipe';
import { AutoresArticuloPipe } from './pipes/autores-articulo.pipe';
import { BusquedaGeneralComponent } from './components/busqueda-general/busqueda-general.component';
import { HomeComponent } from './components/home/home.component';

//rutas
import { ROUTES } from './app.routes';
import { MapaComponent } from './components/mapa/mapa.component';
import { BusquedarevComponent } from './components/busquedarev/busquedarev.component';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { GlobitosComponent } from './components/globitos/globitos.component';
import { FiltrosRevistaComponent } from './components/filtros/filtros-revista.component';
import { GlobitosRevistaComponent } from './components/globitos/globitos-revista.component';
import { PaginadorComponent } from './components/paginador/paginador.component';
import { PaginadorArticulosComponent } from './components/paginador/paginador-articulos.component';




@NgModule({
  declarations: [
    AppComponent,
    UltimosArticulosComponent,
    TituloArticuloPipe,
    AutoresArticuloPipe,
    BusquedaGeneralComponent,
    HomeComponent,
    MapaComponent,
    BusquedarevComponent,
    FiltrosComponent,
    FiltrosRevistaComponent,
    GlobitosComponent,
    GlobitosRevistaComponent,
    PaginadorComponent,
    PaginadorArticulosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { useHash: true})
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
