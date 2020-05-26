import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BusquedaGeneralComponent } from './components/busqueda-general/busqueda-general.component';
import { BusquedarevComponent } from './components/busquedarev/busquedarev.component';
import { RevistasTableComponent } from './components/revistas-table/revistas-table.component';



export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'busquedaGeneral', component: BusquedaGeneralComponent },
    { path: 'busquedarev', component: BusquedarevComponent}, 
    { path: 'revistas-table', component: RevistasTableComponent},
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
   
];