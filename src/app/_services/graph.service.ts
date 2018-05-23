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
    //const url = `${environment.api_urlbase}values/5`;
    
    return this.http.get<Memory>(url, {observe: 'response'}).pipe(res => res);  
  }
}
