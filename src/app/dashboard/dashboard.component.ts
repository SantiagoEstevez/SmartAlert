import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from '../_services/auth.service'
import { GraphService } from '../_services/graph.service'
import { Router } from '@angular/router'
import { NodeDetailsComponent } from '../node-details/node-details.component'
import { ListNodes } from '../_services/listNodes.service';
import { NodeDetails } from '../_models/node-details';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Memory } from '../_models/memory';

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

  private data: any[] = [];
  private nodeList:NodeDetails[] = [];
  private nodesNames: string[] = [];
  private colors: string[] = ["#34AF90", "#349AAF", "#345DAF", "#7B34AF", "#AF349C", "#AF3441", "#A8AF34", "#3B34AF"];
  chart = [];
  LineChart: any;
  PieChart: any;

  constructor(
    private authService: AuthService,
    private graphService: GraphService,
    private router: Router,
    private _listNodesService: ListNodes
  ) { }

  ngOnInit() {

    let nodos = this._listNodesService.getNodesNames().subscribe( data => {
      for(let node in data){
        if(data[node] != undefined && data[node] != "syslog") {
          this.nodesNames.push(data[node]);
        }
      }
      this.getInfoRamByDate();
      
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
        datasets: []
      }
    });
  }

  async getInfoRamByDate() {
    let today = new Date();

    let day1 = new Date();
    day1.setDate(today.getDate() -1);

    let day2 = new Date();
    day2.setDate(today.getDate() -2);

    let day3 = new Date();
    day3.setDate(today.getDate() -3);

    let day4 = new Date();
    day4.setDate(today.getDate() -4);

    let day5 = new Date();
    day5.setDate(today.getDate() -5);

    let hoy =  today.getFullYear().toString() + this.format(today.getMonth() + 1) + this.format(today.getDate());
    let hace1 =  day1.getFullYear().toString() + this.format(day1.getMonth() + 1) + this.format(day1.getDate());
    let hace2 =  day2.getFullYear().toString() + this.format(day2.getMonth() + 1) + this.format(day2.getDate());
    let hace3 =  day3.getFullYear().toString() + this.format(day3.getMonth() + 1) + this.format(day3.getDate());
    let hace4 =  day4.getFullYear().toString() + this.format(day4.getMonth() + 1) + this.format(day4.getDate());
    let hace5 =  day4.getFullYear().toString() + this.format(day4.getMonth() + 1) + this.format(day4.getDate());

    for (let i in this.nodesNames) {
      let data = [];

      console.log(hace1, hoy);
      data.push(await this.getMayorUso(this.nodesNames[i], hace1, hoy));
      data.push(await this.getMayorUso(this.nodesNames[i], hace2, hace1));
      data.push(await this.getMayorUso(this.nodesNames[i], hace3, hace2));
      data.push(await this.getMayorUso(this.nodesNames[i], hace4, hace3));
      data.push(await this.getMayorUso(this.nodesNames[i], hace5, hace4));

      let newdata = { 
        data: data,
        borderColor: this.colors[i],
        fill: false,
        label: this.nodesNames[i]
      }

      this.LineChart.data.datasets.push(newdata);
      this.LineChart.update();
      console.log("Grafica actualizada");
    }
  }

  getMayorUso(node: string, from: string, to: string) {
    return new Promise(resolve => {
      console.log("se carga: " + node + " de " + from + " a " + to);

      this.graphService.getMemoryHistory(node, from, to).subscribe(res => {
        let dataM: Memory[] = res.body;
        console.log(dataM);

        let usoMayor: number = 0;

        for (let d in dataM) {
          console.log("entre a datos");

          let uso = (dataM[d].memoriaEnUso * 100) / dataM[d].memoriaTotal
          if (uso > usoMayor) {
            usoMayor = uso;
          }
        }
        
        console.log(usoMayor);
        resolve(usoMayor);
      });
    });
  }

  format(numero: number): string {
    let result = numero.toString();
    if (result.length < 2) {
      return "0" + result;
    } else {
      return result;
    }
  }

  saveNode(node: NodeDetails) {
    console.log("se guerda");
    console.log(node);
    localStorage.setItem('@easyaler::node', JSON.stringify(node));
    //this.router.navigate(['node-detail'], { queryParams: { name: node.name } });
    this.router.navigate(['/node-detail', node.name]);
    //this.router.navigate(['node-detail', { outlets: { 'list-outlet': [node.name]} }]);
  }
}
