import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NodeDetails } from '../_models/node-details';

@Injectable()
export class ListNodes {

  private nodesList:any[] = [ { name:"Node 1", distro:"Linux", ipPublica:"128.168.3.2", cantCpus:3, totalRAM:1024}, { name:"Node 2", distro:"Windows"}];

  constructor( private http: HttpClient ) { }

  getNodesNames(){
    const url = `${environment.api_urlbase}/rest/infra/listarNodos`;

    //return this.http.get<string[]>(url, {observe: 'response'}).pipe(res => res);

    return ["node1", "node2"];
  }

  getNodes( node:string ){
    const url = `${environment.api_urlbase}/rest/info/cabezal/` + node;

    //return this.http.get<NodeDetails>(url, {observe: 'response'}).pipe(res => res);

    return this.nodesList;
  }
}
