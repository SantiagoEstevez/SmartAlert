import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EventConfiguration } from '../_models/eventConf';
import { Event } from '../_models/event';
import { EventType } from '../_models/EventType';
import { AlertType } from '../_models/alert-type';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  getListEvents() {
    const url = `${environment.api_urlbase}rest/eventos/getListaEventosG`;
    return this.http.get<Event[]>(url, {observe: 'response'}).pipe(res => res);
  };

  getTypes() {
    const url = `${environment.api_urlbase}rest/eventos/getTiposEventos`;
    return this.http.get<EventType[]>(url, {observe: 'response'}).pipe(res => res);
  }

  getAlerts() {
    const url = `${environment.api_urlbase}rest/eventos/getNivelesAlertasEG`;
    return this.http.get<AlertType[]>(url, {observe: 'response'}).pipe(res => res);
  }

  addEvent(nombre: String) {
    const urlHead = `${environment.api_urlbase}rest/eventos/crearEG/${nombre}`;
    return this.http.post(urlHead, "").pipe(res => res);
  };

  addConfigs(nombre: String, listConfig: EventConfiguration[]) {
    for(let i in listConfig){
      const urlConfig = `${environment.api_urlbase}rest/eventos/confEventoG/${nombre}/${listConfig[i].tipo}/${listConfig[i].nivel}/${listConfig[i].alerta}`;
      this.http.post(urlConfig, "");
    }
  }
  
}
