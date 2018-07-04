import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { Agent } from '../_models/logAgent';
import { AgentService } from '../_services/agent.service';
import { ListNodes } from '../_services/listNodes.service';
import { IpData } from '../_models/ip-data';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;

  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  marker: google.maps.Marker;
  currentLat: any;
  currentLong: any;
  nodesNames: string[] = [];
  logs: Agent[] = [];
  nodeName: string;

  constructor(
    private agentService: AgentService,
    private listNodes: ListNodes
  ) {}

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(-34.9056156, -56.1738888),
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    //Preparo fechas
    this.dateFrom.setDate(this.dateFrom.getDate() -60);

    //Formateo fechas
    let from =  this.dateFrom.getFullYear().toString() + "-" + this.format(this.dateFrom.getMonth() + 1) + "-" + this.format(this.dateFrom.getDate());
    let to = this.dateTo.getFullYear().toString() + "-" + this.format(this.dateTo.getMonth() + 1) + "-" + this.format(this.dateTo.getDate());

    this.listNodes.getNodesNames().subscribe(data => {
      this.nodesNames.push("todos");

      for(let node in data){
        if(data[node] != "syslog"){
          let name = data[node];
          this.nodesNames.push(name);
        }
      }

      this.nodeName = "todos";
      this.getLogs("todos", from, to);
    });
  }

  getLogs(name: String, from: string, to: string) {
    if (name == "" || name == "todos") {
      for (let i in this.nodesNames) {
        if (this.nodesNames[i] != "todos") {
          this.getLogsByNode(this.nodesNames[i], from, to);
        }
      }
    } else {
      this.getLogsByNode(name, from, to);
    }
  }

  getLogsByNode(name: String, from: string, to: string) {
    this.agentService.getAgentLogs(name, from, to).subscribe(res => {
      this.logs = res.body;

      for(let i in this.logs){
        this.agentService.getDataIp(this.logs[i].fromHostIp).subscribe(resip => {
          let ipdata: IpData = resip.body;

          if (ipdata.loc) {
            console.log("esto es lo que me devuelve: ");
            console.log(this.logs[i]);
            console.log(ipdata);

            let marker = new google.maps.Marker({
              position: new google.maps.LatLng(Number(ipdata.loc.split(',')[0]), Number(ipdata.loc.split(',')[1])),
              map: this.map,
              title: name + " | " + this.logs[i].sysLogSeverityText + " | " + ipdata.city + " | " + ipdata.region
            });

            this.markers.push(marker);
          }
        });
      }
    });
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Aca estas!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  format(numero: number): string {
    let result = numero.toString();
    if (result.length < 2) {
      return "0" + result;
    } else {
      return result;
    }
  }

  findHistory() {
    this.clearMarkers();

    let from =  this.dateFrom.getFullYear().toString() + "-" + this.format(this.dateFrom.getMonth() + 1) + "-" + this.format(this.dateFrom.getDate());
    let to = this.dateTo.getFullYear().toString() + "-" + this.format(this.dateTo.getMonth() + 1) + "-" + this.format(this.dateTo.getDate());

    this.getLogs(this.nodeName, from, to);
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  setMapOnAll(map) {
    for (let i in this.markers) {
      this.markers[i].setMap(map);
    }
  }
}
