import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  readonly URL_API = this.config.getConfig().backend.url;

  constructor(private config: ConfigService, private http: HttpClient) {}

  getReservaByUuid(id: any) {
    return this.http.get(this.URL_API + '/reserva/' + id);
    //en vez de obtener jsons o promises devuelve observables
    //al cual nos suscribimos
  }

  getReservas(token: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(this.URL_API + '/reserva', {
      headers: headers,
    });
  }

  updateReservaStatus(data: any) {
    return this.http.put(this.URL_API + '/reserva', data);
  }

  createReserva(data: any) {
    return this.http.post(this.URL_API + '/reserva', data);
  }
}
