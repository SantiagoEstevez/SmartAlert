import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Memory } from '../_models/memory';

@Injectable()
export class MemoryService {

  private totalMemory = { memoriaLibre:2821, memoriaTotal:2948, memoriaEnUso:126}
  private _nodeName:string;

  constructor( private http: HttpClient ) { }

  getMemory( node:string ){
    const url = `${environment.api_urlbase}/rest/info/free/` + node;

    //return this.http.get<Memory>(url, {observe: 'response'}).pipe(res => res);

    return this.totalMemory;
  }
}
