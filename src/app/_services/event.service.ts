import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EventConfiguration } from '../_models/eventConf';
import { Event } from '../_models/event';

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
    return this.http.get<Event[]>(url, {observe: 'response'}).pipe(res => res);
  }

  addEvent(eventName: string, eventDetail: string, listConfig: EventConfiguration[]) : void {
    const urlHead = `${environment.api_urlbase}rest/eventos/crearEG/${eventName}/${eventDetail}`;
    this.http.post(urlHead, "").subscribe(res => {

      for(let i in listConfig){
        const urlConfig = `${environment.api_urlbase}rest/eventos/confEventoG/${eventName}/${listConfig[i].tipo}/1/${listConfig[i].alerta}`;
        this.http.post(urlHead, "");
      }
    });
  };
  
}
