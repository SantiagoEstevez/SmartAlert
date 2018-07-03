import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Memory } from '../_models/memory';
import { HardDiskInfo } from '../_models/hardDisk';
import { Cpu } from '../_models/cpu';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(
    private http: HttpClient,
  ) { }

  getMemory() {
    const url = `${environment.api_urlbase}rest/info/free/node3`;    
    return this.http.get<Memory>(url, {observe: 'response'}).pipe(res => res);  
  }

  getMemoryHistory(nodeName: string, from: string, to: string) {
    const url = `${environment.api_urlbase}rest/info/freeEntreFechas/${nodeName}/${from}/${to}`;
    return this.http.get<Memory[]>(url, {observe: 'response'}).pipe(res => res);  
  }

  getDriveHistory(nodeName: string, from: string, to: string) {
    const url = `${environment.api_urlbase}rest/info/infoDiscoEntreFechas/${nodeName}/${from}/${to}`;    
    return this.http.get<HardDiskInfo[]>(url, {observe: 'response'}).pipe(res => res);  
  }

  getCpuHistory(nodeName: string, from: string, to: string) {
    const url = `${environment.api_urlbase}rest/info/infoCpuEntreFechas/${nodeName}/${from}/${to}`;    
    return this.http.get<Cpu[]>(url, {observe: 'response'}).pipe(res => res);  
  }
}
