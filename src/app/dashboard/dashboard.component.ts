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
import { HardDiskInfo } from '../_models/hardDisk';
import { Cpu } from '../_models/cpu';

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
  LineChartRam: any;
  LineChartDrive: any;
  LineChartCpu: any;
  PieChart: any;
  expand: boolean = false;

  footDrive: string = "Ultimos 5 dias";
  footRam: string = "Ultimos 5 dias";
  footCpu: string = "Ultimos 5 dias";
  
  dateDriveFrom: Date = new Date();
  dateDriveTo: Date = new Date();
  dateRamFrom: Date = new Date();
  dateRamTo: Date = new Date();
  dateCpuFrom: Date = new Date();
  dateCpuTo: Date = new Date();

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
      this.getInfoDriveByDate();
      this.getInfoCpuByDate();
      
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

    let day1 = new Date();
    day1.setDate(today -1);

    let day2 = new Date();
    day2.setDate(today -2);

    let day3 = new Date()
    day3.setDate(today -3);

    let day4 = new Date()
    day4.setDate(today -4);

    this.LineChartRam = new Chart('lineChartRam', {
      type: 'line',
      data: {
        labels: [day4.getDate(), day3.getDate() , day2.getDate(), day1.getDate(), today],
        datasets: []
      }
    });

    this.LineChartDrive = new Chart('lineChartDrive', {
      type: 'line',
      data: {
        labels: [day4.getDate(), day3.getDate() , day2.getDate(), day1.getDate(), today],
        datasets: []
      }
    });

    this.LineChartCpu = new Chart('lineChartCpu', {
      type: 'line',
      data: {
        labels: [day4.getDate(), day3.getDate() , day2.getDate(), day1.getDate(), today],
        datasets: []
      }
    });
  }

  async getInfoRamByDate() {
    let today = new Date();

    let tommorrow = new Date();
    tommorrow.setDate(today.getDate() +1);

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

    let Maniana =  tommorrow.getFullYear().toString() + this.format(tommorrow.getMonth() + 1) + this.format(tommorrow.getDate());
    let hoy =  today.getFullYear().toString() + this.format(today.getMonth() + 1) + this.format(today.getDate());
    let hace1 =  day1.getFullYear().toString() + this.format(day1.getMonth() + 1) + this.format(day1.getDate());
    let hace2 =  day2.getFullYear().toString() + this.format(day2.getMonth() + 1) + this.format(day2.getDate());
    let hace3 =  day3.getFullYear().toString() + this.format(day3.getMonth() + 1) + this.format(day3.getDate());
    let hace4 =  day4.getFullYear().toString() + this.format(day4.getMonth() + 1) + this.format(day4.getDate());
    let hace5 =  day5.getFullYear().toString() + this.format(day5.getMonth() + 1) + this.format(day5.getDate());

    for (let i in this.nodesNames) {
      let data = [];

      data.push(await this.getTopRam(this.nodesNames[i], hace4, hace3));
      data.push(await this.getTopRam(this.nodesNames[i], hace3, hace2));
      data.push(await this.getTopRam(this.nodesNames[i], hace2, hace1));
      data.push(await this.getTopRam(this.nodesNames[i], hace1, hoy));
      data.push(await this.getTopRam(this.nodesNames[i], hoy, Maniana));    

      let newdata = { 
        data: data,
        borderColor: this.colors[i],
        fill: false,
        label: this.nodesNames[i]
      }

      this.LineChartRam.data.datasets.push(newdata);
      this.LineChartRam.update();
      console.log("Grafica actualizada");
    }
  }

  getTopRam(node: string, from: string, to: string) {
    return new Promise(resolve => {

      this.graphService.getMemoryHistory(node, from, to).subscribe(res => {
        let dataM: Memory[] = res.body;

        let usoMayor: number = 0;

        for (let d in dataM) {

          let uso = (dataM[d].memoriaEnUso * 100) / dataM[d].memoriaTotal
          if (uso > usoMayor) {
            usoMayor = uso;
          }
        }

        resolve(usoMayor);
      });
    });
  }

  async getInfoDriveByDate() {
    let today = new Date();

    let tommorrow = new Date();
    tommorrow.setDate(today.getDate() +1);

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

    let Maniana =  tommorrow.getFullYear().toString() + this.format(tommorrow.getMonth() + 1) + this.format(tommorrow.getDate());
    let hoy =  today.getFullYear().toString() + this.format(today.getMonth() + 1) + this.format(today.getDate());
    let hace1 =  day1.getFullYear().toString() + this.format(day1.getMonth() + 1) + this.format(day1.getDate());
    let hace2 =  day2.getFullYear().toString() + this.format(day2.getMonth() + 1) + this.format(day2.getDate());
    let hace3 =  day3.getFullYear().toString() + this.format(day3.getMonth() + 1) + this.format(day3.getDate());
    let hace4 =  day4.getFullYear().toString() + this.format(day4.getMonth() + 1) + this.format(day4.getDate());
    //let hace5 =  day4.getFullYear().toString() + this.format(day4.getMonth() + 1) + this.format(day4.getDate());

    for (let i in this.nodesNames) {
      let data = [];

      data.push(await this.getTopDrive(this.nodesNames[i], hace4, hace3));
      data.push(await this.getTopDrive(this.nodesNames[i], hace3, hace2));
      data.push(await this.getTopDrive(this.nodesNames[i], hace2, hace1));
      data.push(await this.getTopDrive(this.nodesNames[i], hace1, hoy));
      data.push(await this.getTopDrive(this.nodesNames[i], hoy, Maniana));

      let newdata = { 
        data: data,
        borderColor: this.colors[i],
        fill: false,
        label: this.nodesNames[i]
      }

      this.LineChartDrive.data.datasets.push(newdata);
      this.LineChartDrive.update();
      console.log("Grafica drive actualizada");
    }
  }

  getTopDrive(node: string, from: string, to: string) {
    return new Promise(resolve => {

      this.graphService.getDriveHistory(node, from, to).subscribe(res => {
        let dataDrive: HardDiskInfo[] = res.body;

        let usoMayor: number = 0;

        for (let d in dataDrive) {
          let usado = dataDrive[d].espacioTotal - dataDrive[d].espacioDisponible;

          let uso = (usado * 100) / dataDrive[d].espacioTotal
          if (uso > usoMayor) {
            usoMayor = uso;
          }
        }

        resolve(usoMayor);
      });
    });
  }

  async getInfoCpuByDate() {
    let today = new Date();

    let tommorrow = new Date();
    tommorrow.setDate(today.getDate() +1);

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

    let Maniana =  tommorrow.getFullYear().toString() + this.format(tommorrow.getMonth() + 1) + this.format(tommorrow.getDate());
    let hoy =  today.getFullYear().toString() + this.format(today.getMonth() + 1) + this.format(today.getDate());
    let hace1 =  day1.getFullYear().toString() + this.format(day1.getMonth() + 1) + this.format(day1.getDate());
    let hace2 =  day2.getFullYear().toString() + this.format(day2.getMonth() + 1) + this.format(day2.getDate());
    let hace3 =  day3.getFullYear().toString() + this.format(day3.getMonth() + 1) + this.format(day3.getDate());
    let hace4 =  day4.getFullYear().toString() + this.format(day4.getMonth() + 1) + this.format(day4.getDate());
    //let hace5 =  day4.getFullYear().toString() + this.format(day4.getMonth() + 1) + this.format(day4.getDate());

    for (let i in this.nodesNames) {
      let data = [];

      console.log(hace1, hoy);
      data.push(await this.getTopCpu(this.nodesNames[i], hace4, hace3));
      data.push(await this.getTopCpu(this.nodesNames[i], hace3, hace2));
      data.push(await this.getTopCpu(this.nodesNames[i], hace2, hace1));
      data.push(await this.getTopCpu(this.nodesNames[i], hace1, hoy));
      data.push(await this.getTopCpu(this.nodesNames[i], hoy, Maniana));

      let newdata = { 
        data: data,
        borderColor: this.colors[i],
        fill: false,
        label: this.nodesNames[i]
      }

      this.LineChartCpu.data.datasets.push(newdata);
      this.LineChartCpu.update();
      console.log("Grafica drive actualizada");
    }
  }

  getTopCpu(node: string, from: string, to: string) {
    return new Promise(resolve => {

      this.graphService.getCpuHistory(node, from, to).subscribe(res => {
        let dataCpu: Cpu[] = res.body;

        let usoMayor: number = 0;

        for (let d in dataCpu) {
          let uso = dataCpu[d].cpuLoad;

          if (uso > usoMayor) {
            usoMayor = uso;
          }
        }

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

  async findRamHistory() {
    this.removeDataChart(this.LineChartRam);
    let titulo: boolean = true;

    for (let i in this.nodesNames) {
      let data = [];
      let termine: boolean = false
      let d = 0;

      while(!termine) {
        let from = new Date(this.dateRamFrom);
        let to = new Date(this.dateRamFrom);
  
        from.setDate(this.dateRamFrom.getDate() + d);
        to.setDate(this.dateRamFrom.getDate() + (d +1));

        let desde =  from.getFullYear().toString() + this.format(from.getMonth() + 1) + this.format(from.getDate());
        let hasta =  to.getFullYear().toString() + this.format(to.getMonth() + 1) + this.format(to.getDate());

        if (titulo) {
          let lbl_desde =  this.format(from.getDate()) + "/" + this.format(from.getMonth() + 1) + "/" + from.getFullYear().toString()
          this.addLabelChart(this.LineChartRam, lbl_desde);
        }

        data.push(await this.getTopRam(this.nodesNames[i], desde, hasta));

        if (this.dateRamTo.getFullYear() == from.getFullYear() && this.dateRamTo.getMonth() == from.getMonth() && this.dateRamTo.getDate() == from.getDate()) {
          termine = true;
        }

        d ++;
      }

      titulo = false;

      let newdata = { 
        data: data,
        borderColor: this.colors[i],
        fill: false,
        label: this.nodesNames[i]
      }

      this.addDataChart(this.LineChartRam, newdata);
      console.log("Grafica Ram actualizada");
    }

    let _desde =  this.dateRamFrom.getFullYear().toString() + this.format(this.dateRamFrom.getMonth() + 1) + this.format(this.dateRamFrom.getDate());
    let _hasta =  this.dateRamTo.getFullYear().toString() + this.format(this.dateRamTo.getMonth() + 1) + this.format(this.dateRamTo.getDate());

    this.footRam = "Desde " + _desde + " hasta " + _hasta;
  }

  async findDriveHistory() {
    this.removeDataChart(this.LineChartDrive);
    let titulo: boolean = true;

    for (let i in this.nodesNames) {
      let data = [];
      let termine: boolean = false
      let d = 0;

      while(!termine) {
        let from = new Date(this.dateDriveFrom);
        let to = new Date(this.dateDriveFrom);
  
        from.setDate(this.dateDriveFrom.getDate() + d);
        to.setDate(this.dateDriveFrom.getDate() + (d +1));

        let desde =  from.getFullYear().toString() + this.format(from.getMonth() + 1) + this.format(from.getDate());
        let hasta =  to.getFullYear().toString() + this.format(to.getMonth() + 1) + this.format(to.getDate());

        if (titulo) {
          let lbl_desde =  this.format(from.getDate()) + "/" + this.format(from.getMonth() + 1) + "/" + from.getFullYear().toString()
          this.addLabelChart(this.LineChartDrive, lbl_desde);
        }

        data.push(await this.getTopDrive(this.nodesNames[i], desde, hasta));

        if (this.dateDriveTo.getFullYear() == from.getFullYear() && this.dateDriveTo.getMonth() == from.getMonth() && this.dateDriveTo.getDate() == from.getDate()) {
          termine = true;
        }

        d ++;
      }

      titulo = false;

      let newdata = { 
        data: data,
        borderColor: this.colors[i],
        fill: false,
        label: this.nodesNames[i]
      }

      this.addDataChart(this.LineChartDrive, newdata);
      console.log("Grafica drive actualizada");
    }

    let _desde =  this.dateDriveFrom.getFullYear().toString() + this.format(this.dateDriveFrom.getMonth() + 1) + this.format(this.dateDriveFrom.getDate());
    let _hasta =  this.dateDriveTo.getFullYear().toString() + this.format(this.dateDriveTo.getMonth() + 1) + this.format(this.dateDriveTo.getDate());

    this.footDrive = "Desde " + _desde + " hasta " + _hasta;
  }

  async findCpuHistory() {
    this.removeDataChart(this.LineChartCpu);
    let titulo: boolean = true;

    for (let i in this.nodesNames) {
      let data = [];
      let termine: boolean = false
      let d = 0;

      while(!termine) {
        let from = new Date(this.dateCpuFrom);
        let to = new Date(this.dateCpuFrom);
  
        from.setDate(this.dateCpuFrom.getDate() + d);
        to.setDate(this.dateCpuFrom.getDate() + (d +1));

        let desde =  from.getFullYear().toString() + this.format(from.getMonth() + 1) + this.format(from.getDate());
        let hasta =  to.getFullYear().toString() + this.format(to.getMonth() + 1) + this.format(to.getDate());

        if (titulo) {
          let lbl_desde =  this.format(from.getDate()) + "/" + this.format(from.getMonth() + 1) + "/" + from.getFullYear().toString()
          this.addLabelChart(this.LineChartCpu, lbl_desde);
        }

        data.push(await this.getTopCpu(this.nodesNames[i], desde, hasta));

        if (this.dateCpuTo.getFullYear() == from.getFullYear() && this.dateCpuTo.getMonth() == from.getMonth() && this.dateCpuTo.getDate() == from.getDate()) {
          termine = true;
        }

        d ++;
      }

      titulo = false;

      let newdata = { 
        data: data,
        borderColor: this.colors[i],
        fill: false,
        label: this.nodesNames[i]
      }

      this.addDataChart(this.LineChartCpu, newdata);
      console.log("Grafica Cpu actualizada");
    }

    let _desde =  this.dateCpuFrom.getFullYear().toString() + this.format(this.dateCpuFrom.getMonth() + 1) + this.format(this.dateCpuFrom.getDate());
    let _hasta =  this.dateCpuTo.getFullYear().toString() + this.format(this.dateCpuTo.getMonth() + 1) + this.format(this.dateCpuTo.getDate());

    this.footCpu = "Desde " + _desde + " hasta " + _hasta;
  }

  addLabelChart(chart, label) {
    chart.data.labels.push(label);
    chart.update();
  }

  addDataChart(chart, data) {
    chart.data.datasets.push(data);
    chart.update();
  }

  removeDataChart(chart) {
    chart.data.labels = [];
    chart.data.datasets = [];

    chart.update();
  }

  bigbang() {
    this.expand = !this.expand;
  }
}
