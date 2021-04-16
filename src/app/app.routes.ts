import { Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { BusquedaGeneralComponent } from './pages/busqueda-general/busqueda-general.component';
import { BusquedaPaisComponent } from './pages/busqueda-pais/busqueda-pais.component';
import { BusquedaPalabraClaveComponent } from './pages/busqueda-palabra-clave/busqueda-palabra-clave.component';
import { HomeComponent } from './pages/home/home.component';

export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'home/:section', component: HomeComponent },
    { path: 'busquedaGeneral', component: BusquedaGeneralComponent },
    { path: 'busquedaGeneral/:palabra', component: BusquedaGeneralComponent },
    { path: 'busqueda-pal-clav', component: BusquedaPalabraClaveComponent},
    { path: 'busqueda-pal-clav/:keyword', component: BusquedaPalabraClaveComponent },
    { path: 'busquedaPais', component: BusquedaPaisComponent },
    { path: 'busquedaPais/:cvePais', component: BusquedaPaisComponent },
    { path: 'acerca-de', component: AboutUsComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
