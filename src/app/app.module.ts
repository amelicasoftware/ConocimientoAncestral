import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Librerias
import { NgxSpinnerModule } from 'ngx-spinner';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';

// Route
import { ROUTES } from './app.routes';

// PIPES
import { AutoresArticuloPipe } from './pipes/autores-articulo.pipe';
import { TituloArticuloPipe } from './pipes/titulo-articulo.pipe';

// Interceptores
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';

// Components
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AppComponent } from './app.component';
import { BalloonsComponent } from './components/balloons/balloons.component';
import { BannerSearchesComponent } from './components/banner-searches/banner-searches.component';
import { BusquedaGeneralComponent } from './pages/busqueda-general/busqueda-general.component';
import { BusquedaPaisComponent } from './pages/busqueda-pais/busqueda-pais.component';
import { BusquedaPalabraClaveComponent } from './pages/busqueda-palabra-clave/busqueda-palabra-clave.component';
import { FiltersComponent } from './components/filters/filters.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { MenuMobileComponent } from './components/menu-mobile/menu-mobile.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TableComponent } from './components/table/table.component';
import { TargetComponent } from './components/target/target.component';
import { UltimosArticulosComponent } from './components/ultimos-articulos/ultimos-articulos.component';
import { MapComponent } from './components/map/map.component';
import { NetworkComponent } from './components/network/network.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AboutUsComponent,
    AppComponent,
    AutoresArticuloPipe,
    BalloonsComponent,
    BannerSearchesComponent,
    BusquedaGeneralComponent,
    BusquedaPaisComponent,
    BusquedaPalabraClaveComponent,
    FiltersComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    MapaComponent,
    MenuMobileComponent,
    PaginationComponent,
    TableComponent,
    TargetComponent,
    TituloArticuloPipe,
    UltimosArticulosComponent,
    MapComponent,
    NetworkComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MenuModule,
    RouterModule.forRoot(ROUTES, { useHash: true}),
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
