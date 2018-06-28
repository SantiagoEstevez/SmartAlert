import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EventConfiguration } from '../_models/eventConf';
import { Event } from '../_models/event';
import { EventType } from '../_models/eventType';
import { AlertType } from '../_models/alert-type';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getListEvents() {
    const url = `${environment.api_urlbase}rest/eventos/getListaEventosG`;
    return this.http.get<Event[]>(url, {observe: 'response'}).pipe(res => res);
  };

  getListConfigsByEvent(idEvent: number) {
    const url = `${environment.api_urlbase}rest/eventos/getConfEG/${idEvent}`;
    return this.http.get<EventConfiguration[]>(url, {observe: 'response'}).pipe(res => res);
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
      console.log(urlConfig);
      this.http.post(urlConfig, "").subscribe();
    }
  }

  editConfigs(idEvent: number, listConfig: EventConfiguration[]) {
    for(let i in listConfig){
      const urlConfig = `${environment.api_urlbase}rest/eventos/modificarConfEG/${idEvent}/${listConfig[i].tipo}/${listConfig[i].nivel}/${listConfig[i].alerta}`;
      this.http.put(urlConfig, "").subscribe();
    }
  }

  activeEvent(idEvent: number) {
    const urlHead = `${environment.api_urlbase}rest/eventos/activarEG/${idEvent}`;
    return this.http.put(urlHead, "").pipe(res => res);
  }

  disableEvent(idEvent: number) {
    const urlHead = `${environment.api_urlbase}rest/eventos/desactivarEG/${idEvent}`;
    return this.http.put(urlHead, "").pipe(res => res);
  }

  suscribeEvent(idEvent: number) {
    const urlHead = `${environment.api_urlbase}rest/eventos/sus_eg/${idEvent}`;
    return this.http.post(urlHead, "").pipe(res => res);
  }

  unsuscribeEvent(idEvent: number) {
    const urlHead = `${environment.api_urlbase}rest/eventos/cancela_sus_evento_global/${idEvent}`;
    return this.http.put(urlHead, "").pipe(res => res);
  }

  setEventCookie(event: Event) {
    this.cookieService.delete('@easyaler::event');
    this.cookieService.set('@easyaler::event', JSON.stringify(event));
  }

  getEventCookie() : Event {
    return <Event>JSON.parse(this.cookieService.get('@easyaler::event'));
  }
}
