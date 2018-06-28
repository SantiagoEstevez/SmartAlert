import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from '../_services/auth.service'
import { GraphService } from '../_services/graph.service'
import { Router } from '@angular/router'
import { NodeDetailsComponent } from '../node-details/node-details.component'
import { ListNodes } from '../_services/listNodes.service';
import { NodeDetails } from '../_models/node-details';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private nodeList:NodeDetails[] = [];
  private nodesNames:Array<any> = [];
  chart = [];
  DoughnutChart: any;
  PieChart: any;

  constructor(
    private authService: AuthService,
    private graphService: GraphService,
    private router: Router,
    private _listNodesService:ListNodes
  ) { }

  ngOnInit() {

    let nodos = this._listNodesService.getNodesNames().subscribe( data => {
      for(let node in data){
        if(data[node] != undefined && data[node] != "syslog"){
          this._listNodesService.getNodesDetails(data[node]).subscribe( res => {
            let newNode = new NodeDetails();
            newNode.cantCpus = res["cantCpus"];
            newNode.distro = res["distro"];
            newNode.ipAddress = res["ipAddress"];
            newNode.ipPublica = res["ipPublica"];
            newNode.name = data[node];
            newNode.totalRAM = res["totalRAM"];
            this.nodeList.push(newNode);
          })
        }
      }
    });


    /*this.DoughnutChart = new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
          datasets: [{
              backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 99, 0)', 'rgb(255, 0, 132)'],
              data: [(data["espacioTotal"] - data["espacioDisponible"]), data["espacioDisponible"]]
          }],

          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: [
              'Ocupado',
              'Disponible',
          ]
      },
      options: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontColor: 'rgb(0, 0, 0)',
                usePointStyle: true
            }
        },
        elements: {
          pointStyle: 'circle'
        }
      }
  });*/

    //console.log('dash 1 ' + JSON.stringify(nodos));
    //console.log('nodesnames ' + this.nodesNames);

/*
    this.http.get(url).subscribe( data => {
      for(let node in data){
        this.nodesNames.push(data[node]);
      }
    });
*/
    //console.log(this.nodesNames);


    //this.nodesNames.forEach((x) => {
      //this.nodeList.push(this._listNodesService.getNodesDetails(x));
    //});
  }
}
