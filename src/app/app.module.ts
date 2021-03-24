import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Librerias
import { NgxSpinnerModule } from 'ngx-spinner';

// Route
import { ROUTES } from './app.routes';

// PIPES
import { AutoresArticuloPipe } from './pipes/autores-articulo.pipe';
import { TituloArticuloPipe } from './pipes/titulo-articulo.pipe';

// Components
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AppComponent } from './app.component';
import { BalloonsComponent } from './components/balloons/balloons.component';
import { BusquedaGeneralComponent } from './pages/busqueda-general/busqueda-general.component';
import { BusquedaPaisComponent } from './pages/busqueda-pais/busqueda-pais.component';
import { BusquedaPalabraClaveComponent } from './pages/busqueda-palabra-clave/busqueda-palabra-clave.component';
import { FiltersComponent } from './components/filters/filters.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TableComponent } from './components/table/table.component';
import { TargetComponent } from './components/target/target.component';
import { UltimosArticulosComponent } from './components/ultimos-articulos/ultimos-articulos.component';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';



@NgModule({
  declarations: [
    AboutUsComponent,
    AppComponent,
    AutoresArticuloPipe,
    BalloonsComponent,
    BusquedaGeneralComponent,
    BusquedaPaisComponent,
    BusquedaPalabraClaveComponent,
    FiltersComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    MapaComponent,
    PaginationComponent,
    TableComponent,
    TargetComponent,
    TituloArticuloPipe,
    UltimosArticulosComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { useHash: true}),
    NgxSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
