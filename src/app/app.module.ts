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
import { VistaTablaComponent } from './components/vista-tabla/vista-tabla.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TarjetaArticulosComponent } from './components/tarjeta-articulos/tarjeta-articulos.component';
import { RevistasTableComponent } from './components/revistas-table/revistas-table.component';
import { BusquedaPaisComponent } from './components/busqueda-pais/busqueda-pais.component';
import { VistaTablaArticulosComponent } from './components/vista-tabla-articulos/vista-tabla-articulos.component';
import { VistaArtTABComponent } from './components/vista-art-tab/vista-art-tab.component';
import { BusquedaPalClavComponent } from './components/busqueda-pal-clav/busqueda-pal-clav.component';
import { TarjetaArticuloComponent } from './components/busqueda-pais/tarjeta-articulo/tarjeta-articulo.component';
import { FiltroPaisComponent } from './components/busqueda-pais/filtro-pais/filtro-pais.component';
import { FiltpalclavComponent } from './components/filtros/filtpalclav.component';
import { PaginadorPalClavComponent } from './components/paginador/paginador-pal-clav.component';
import { BusquedaPalclavVtabComponent } from './components/busqueda-palclav-vtab/busqueda-palclav-vtab.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GlobitosPalClavComponent } from './components/globitos/globitos-pal-clav.component';





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
    PaginadorArticulosComponent,
    VistaTablaComponent,
    TarjetaArticulosComponent,
    RevistasTableComponent,
    BusquedaPaisComponent,
    VistaTablaArticulosComponent,
    VistaArtTABComponent,
    BusquedaPalClavComponent,
    TarjetaArticuloComponent,
    FiltroPaisComponent,
    BusquedaPalClavComponent,  
    FiltpalclavComponent, PaginadorPalClavComponent, BusquedaPalclavVtabComponent, HeaderComponent, FooterComponent, GlobitosPalClavComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { useHash: true}),
    BrowserAnimationsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
