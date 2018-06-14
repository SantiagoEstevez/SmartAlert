import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NodeDetails } from '../_models/node-details';

@Injectable()
export class ListNodes {

  private nodesNames:any[];
  private nodesList:NodeDetails[]; //= [ { name:"Node 1", distro:"Linux", ipPublica:"128.168.3.2", cantCpus:3, totalRAM:1024}, { name:"Node 2", distro:"Windows"}];

  constructor( private http: HttpClient) {

  }

  getNodesNames(){

    const url = `${environment.api_urlbase}rest/infratest/listarNodos`;

      return this.http.get(url);
/*
    this.http.get(url, {observe: 'response'}).subscribe(
        res => {
          res.body.map()
          console.log('body: ' + res.body);
          JSON.parse(res.body).forEach(x => {

          })
          console.log()
          //this.nodesNames = JSON.stringify(res.body).replace("[","").replace("]","").replace(',',"").split("\"\"");
        },
        err => {
          console.log("error");
          console.log(err);
        }
      );

      return this.nodesNames;
      */
  }

  getNodesDetails(name:string){

    const url = `${environment.api_urlbase}rest/infotest/cabezal/` + name;

    return this.http.get(url);
/*
    this.http.get(url, {observe: 'response'}).subscribe(
        res => {
          console.log(JSON.stringify(res));
          return true;
        },
        err => {
          console.log("error");
          console.log(err);
          return false;
        }
      );

    return new NodeDetails();
*/
  }
}
