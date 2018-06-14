import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HardDiskInfo } from '../_models/hardDisk';
import { GraphService } from '../_services/graph.service'

@Injectable()
export class HardDiskService {

  private hdi:any = { mount : "/dev/sda1",  espacioTotal: 9.2,  espacioDisponible: 7.9 };

  constructor( private http: HttpClient,
  private graphService: GraphService,
 ){}

  getDiskInformation( nodo:string ){

    const url = `${environment.api_urlbase}rest/infoTest/infoDisco/` + nodo;

    //return this.http.get<HardDiskInfo>(url, {observe: 'response'}).pipe(res => res);

    return this.http.get<HardDiskInfo>(url);

    //return this.hdi;
  }
}
