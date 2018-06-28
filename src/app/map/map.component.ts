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

  map: google.maps.Map;
  marker: google.maps.Marker;
  currentLat: any;
  currentLong: any;
  nodesNames: string[] = [];
  logs: Agent[] = [];

  constructor(
    private agentService: AgentService,
    private listNodes: ListNodes
  ) {}

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(-34.9056156, -56.1738888),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    //Preparo fechas
    let today = new Date();
    let day1 = new Date();
    day1.setDate(today.getDate() -1);

    //Formateo fechas
    let hoy =  this.format(today.getDate()) + "-" + this.format(today.getMonth() + 1) + "-" + today.getFullYear().toString();
    let hace1 = this.format(day1.getDate()) + "-" + this.format(day1.getMonth() + 1) + "-" + day1.getFullYear().toString();

    this.listNodes.getNodesNames().subscribe(data => {
      for(let node in data){
        if(data[node] != "syslog"){
          let name = data[node];
          this.nodesNames.push(name);

          this.agentService.getAgentLogs(name, hace1, hoy).subscribe(res => {
            this.logs = res.body;

            for(let i in this.logs){
              this.agentService.getDataIp(this.logs[i].fromHostIp).subscribe(resip => {
                let ipdata: IpData = resip.body;

                this.marker = new google.maps.Marker({
                  position: new google.maps.LatLng(Number(ipdata.loc.split(',')[0]), Number(ipdata.loc.split(',')[1])),
                  map: this.map,
                  title: name + " | " + this.logs[i].sysLogSeverityText
                });
              });
            }
          });
        }
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
}
