import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Agent } from '../_models/logAgent';
import { IpData } from '../_models/ip-data';

@Injectable()
export class AgentService {

  constructor( private http: HttpClient ) { }

  getAgentLogs(node:String, dateBegin:String, dateEnd:String){
    const url = `${environment.api_urlbase}rest/info/infoAgente/` + node + '/' + dateBegin + '/' + dateEnd;

    return this.http.get<Agent[]>(url, {observe: 'response'}).pipe(res => res);
  }

  getMapLogs(node:String, dateBegin:String, dateEnd:String){
    const url = `${environment.api_urlbase}rest/info/infoAgenteMapa/` + node + '/' + dateBegin + '/' + dateEnd;

    return this.http.get<Agent[]>(url, {observe: 'response'}).pipe(res => res);
  }

  getDataIp(ip: string){
    const url = `http://ipinfo.io/${ip}`
    return this.http.get<IpData>(url, {observe: 'response'}).pipe(res => res);
  }
}
