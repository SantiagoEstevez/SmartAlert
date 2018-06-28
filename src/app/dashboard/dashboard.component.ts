import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from '../_services/auth.service'
import { GraphService } from '../_services/graph.service'
import { Router } from '@angular/router'
import { NodeDetailsComponent } from '../node-details/node-details.component'
import { ListNodes } from '../_services/listNodes.service';
import { NodeDetails } from '../_models/node-details';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {

  private nodeList:NodeDetails[] = [];
  private nodesNames:Array<any> = [];
  chart = [];
  LineChart: any;
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

    let today = new Date().getDate();

    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: [today -4, today- 3 , today -2, today -1, today],
        datasets: [
          { 
            data: [100, 50, 40, 80, 10],
            borderColor: "#3cba9f",
            fill: false
          },
          { 
            data: [44, 66, 40, 80, 100],
            borderColor: "#ffcc00",
            fill: false
          },
        ]
      }
  });

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
