import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Memory } from '../_models/memory';

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

  geDriveHistory() {
    const url = `${environment.api_urlbase}rest/info/free/node3`;    
    return this.http.get<Memory[]>(url, {observe: 'response'}).pipe(res => res);  
  }
}
