import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Agent } from '../_models/logAgent';

@Injectable()
export class AgentService {

  constructor( private http: HttpClient ) { }

  getAgentLogs(node:String, date:String){
    const url = `${environment.api_urlbase}rest/infotest/infoAgente/` + node + '/' + date;

    return this.http.get<Agent[]>(url, {observe: 'response'}).pipe(res => res);
  }
}
