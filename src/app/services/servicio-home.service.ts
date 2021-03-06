import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ServicioHomeService {

  url: string = GlobalConstants.serviciosURL;
  public urlFront: string = GlobalConstants.url;

  constructor( private http: HttpClient) {
    console.log('servicio listo');
  }

  getUltimosArticulos(): any{
    console.log('servicio articulos');
    return this.http.get(this.url + 'articulos/recientes');
  }

  getRevistas(): any{
    return this.http.get(this.url + 'revistas/recientes');
  }

  getNumeros(): any{
    return this.http.get(`${this.urlFront}assets/js/json/numeraliasCA.json`);
  }
}
