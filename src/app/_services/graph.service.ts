import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(
    private http: HttpClient,
  ) { }

  getMemory() {
    //const url = `${this.url}/rest/info/free/node3`;
    const url = `${environment.api_urlbase}values/5`;
    //this.headers.append("SecurityToken", "eyJhbGciOiJIUzUxMiJ9.eyJSb2xlcyI6IiIsIlVzdWFyaW8iOiJmZWRlIiwic3ViIjoiVG9rZW4gdmFsaWRvIiwiaXNzIjoiR3J1cG80LVByb3llY3RvMjAxOCIsImlhdCI6MTUyNjQyNjE5MSwiZXhwIjoxNTI2NDI5NzkxfQ.u4PdsaNc4m9tsjoGzLR2hDhzl6k1TLkrGETvLyBbWvb1QMRhGY_Pu1gpoXmZkMo0N_7pF_OVPreoCOv4m0aJwg");
    
    return this.http.get(url, {responseType: 'text'}).pipe(res => res);  
  }
}
