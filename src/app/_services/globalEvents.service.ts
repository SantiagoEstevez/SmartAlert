import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Event } from '../_models/event';

@Injectable()
export class GlobalEventsService {

  constructor( private http: HttpClient ) { }

  createGlobalEvent( name:string, description:string )
  {
    const url = `${environment.api_urlbase}/rest/eventos/crearEG/` + name + '/' + description;

    return this.http.post<boolean>(url, {observe: 'response'}).pipe(res => res);
  }

  activateGlobalEvent( eventId:string )
  {
    const url = `${environment.api_urlbase}/rest/eventos/activarEG/` + eventId;

    return this.http.put<boolean>(url, {observe: 'response'}).pipe(res => res);
  }

  configurateGlobalEvent( name:string, type:string, level:string, alert:string)
  {
    const url = `${environment.api_urlbase}/rest/eventos/confEventoG/` + name + '/' + type + '/' + level + '/' + alert;

    return this.http.put<boolean>(url, {observe: 'response'}).pipe(res => res);
  }

  getConfigurationGlobalEvent( eventId:string)
  {
    const url = `${environment.api_urlbase}/rest/eventos/getConfEG/` + eventId;

    return this.http.get<boolean>(url, {observe: 'response'}).pipe(res => res);
  }

  getEvents( ){
    const url = `${environment.api_urlbase}/rest/eventos/getListaEventosG`;

    return this.http.get<Event[]>(url, {observe: 'response'}).pipe(res => res);
  }
}
