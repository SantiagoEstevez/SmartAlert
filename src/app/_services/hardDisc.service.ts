import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HardDiskInfo } from '../_models/hardDisk';

@Injectable()
export class HardDiskService {

  private hdi:HardDiskInfo = { mount : "/dev/sda1",  espacioTotal: 9.2,  espacioDisponible: 7.9 };

  constructor( private http: HttpClient ){}

  getDiskInformation( nodo:string ){

    const url = `${environment.api_urlbase}/rest/info/infoDisco/` + nodo;

    //return this.http.get<HardDiskInfo>(url, {observe: 'response'}).pipe(res => res);

    return this.hdi;
  }
}
