import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BusquedaGeneralComponent } from './components/busqueda-general/busqueda-general.component';



export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'busquedaGeneral', component: BusquedaGeneralComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];