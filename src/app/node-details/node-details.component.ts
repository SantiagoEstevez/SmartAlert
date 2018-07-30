import { Component, OnInit } from '@angular/core';
import { ListNodes } from '../_services/listNodes.service';
import {ActivatedRoute} from '@angular/router';
import { NodeDetails } from '../_models/node-details';
import { Memory } from '../_models/memory';
import { GraphService } from '../_services/graph.service';
import { HardDiskInfo } from '../_models/hardDisk';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Cpu } from '../_models/cpu';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-node-details',
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.css']
})
export class NodeDetailsComponent implements OnInit {

  dateDriveFrom: Date = new Date();
  dateDriveTo: Date = new Date();
  dateRamFrom: Date = new Date();
  dateRamTo: Date = new Date();
  dateCpuFrom: Date = new Date();
  dateCpuTo: Date = new Date();

  maxSize: number = 20;

  LineChartRam: any;
  LineChartDrive: any;
  LineChartCpu: any;

  nodeName:string;
  node: NodeDetails = new NodeDetails();
  memoryHistory: Memory[] = [];
  memoryHistoryByPage: Memory[] = [];
  driveHistory: HardDiskInfo[] = [];
  driveHistoryByPage: HardDiskInfo[] = [];
  cpuHistory: Cpu[] = [];
  cpuHistoryByPage: Cpu[] = [];

  constructor(
    private _listNodesService:ListNodes,
    private route: ActivatedRoute,
    private graphService: GraphService
  ) {
  }

  ngOnInit() {
    this.nodeName = this.route.snapshot.params['name'];
    this.node.name = this.nodeName;
    this.node.distro = this.route.snapshot.params['distro'];
    this.node.ipAddress = this.route.snapshot.params['address'];
    this.node.ipPublica = this.route.snapshot.params['public'];
    this.node.cantCpus = this.route.snapshot.params['cpu'];
    this.node.totalRAM = this.route.snapshot.params['ram'];

    this.dateDriveFrom.setDate(this.dateDriveFrom.getDate() - 5);
    this.dateRamFrom.setDate(this.dateRamFrom.getDate() - 5);
    this.dateCpuFrom.setDate(this.dateCpuFrom.getDate() - 5);

    let from = this.dateDriveFrom.getFullYear().toString() + this.format((this.dateDriveFrom.getMonth() + 1)) + this.format(this.dateDriveFrom.getDate());
    let to = this.dateDriveTo.getFullYear().toString() + this.format((this.dateDriveTo.getMonth() + 1)) + this.format(this.dateDriveTo.getDate());

    this.LineChartRam = new Chart('lineChartRam', {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      }
    });

    this.LineChartDrive = new Chart('lineChartDrive', {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      }
    });

    this.LineChartCpu = new Chart('lineChartCpu', {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      }
    });

    this.getRam(from, to);
    this.getDrive(from, to);
    this.getCpu(from, to);
  }

  getRam(from: string, to: string) {
    this.removeDataChart(this.LineChartRam);

    this.graphService.getMemoryHistory(this.nodeName, from, to).subscribe(res => {
      this.memoryHistory = res.body;
      let data = [];

      for (let i in this.memoryHistory) {
        let libre = this.memoryHistory[i].memoriaLibre;
        let total = this.memoryHistory[i].memoriaTotal;
        let usado = this.memoryHistory[i].memoriaEnUso;

        this.memoryHistory[i].pEnUso = (usado * 100) / total;
        this.memoryHistory[i].pLibre = (libre * 100) / total;

        this.addLabelChart(this.LineChartRam, this.memoryHistory[i].fecha);
        data.push(this.memoryHistory[i].pEnUso.toFixed(2));
      }

      let newdata = { 
        data: data,
        borderColor: "#349AAF",
        fill: false,
        label: this.nodeName
      }

      this.addDataChart(this.LineChartRam, newdata);
      this.memoryHistoryByPage = this.memoryHistory.slice(0, 15);
    });
  }

  getDrive(from: string, to: string) {
    this.removeDataChart(this.LineChartDrive);

    this.graphService.getDriveHistory(this.nodeName, from, to).subscribe(res => {
      this.driveHistory = res.body;
      let data = [];

      for (let i in this.driveHistory) {
        let libre = this.driveHistory[i].espacioDisponible;
        let total = this.driveHistory[i].espacioTotal;
        let usado = total - libre;

        this.driveHistory[i].pDisponible = (libre * 100) / total;
        this.driveHistory[i].pUso = (usado * 100) / total;

        this.addLabelChart(this.LineChartDrive, this.driveHistory[i].fecha);
        data.push(this.driveHistory[i].pUso.toFixed(2));
      }

      let newdata = { 
        data: data,
        borderColor: "#349AAF",
        fill: false,
        label: this.nodeName
      }

      this.addDataChart(this.LineChartDrive, newdata);
      this.driveHistoryByPage = this.driveHistory.slice(0, 20);
    });
  }

  getCpu(from: string, to: string) {
    this.removeDataChart(this.LineChartCpu);

    this.graphService.getCpuHistory(this.nodeName, from, to).subscribe(res => {
      this.cpuHistory = res.body;
      let data = [];

      for (let i in this.cpuHistory) {
        this.addLabelChart(this.LineChartCpu, this.cpuHistory[i].fecha);
        data.push(this.cpuHistory[i].cpuLoad.toFixed(2));
      }

      let newdata = { 
        data: data,
        borderColor: "#349AAF",
        fill: false,
        label: this.nodeName
      }

      this.addDataChart(this.LineChartCpu, newdata);
      this.cpuHistoryByPage = this.cpuHistory.slice(0, 20);
    });
  }

  findRamHistory() {
    let from = this.dateRamFrom.getFullYear().toString() + this.format((this.dateRamFrom.getMonth() + 1)) + this.format(this.dateRamFrom.getDate());
    let to = this.dateRamTo.getFullYear().toString() + this.format((this.dateRamTo.getMonth() + 1)) + this.format(this.dateRamTo.getDate());
    this.getRam(from, to);
  }

  findDriveHistory() {
    let from = this.dateDriveFrom.getFullYear().toString() + this.format((this.dateDriveFrom.getMonth() + 1)) + this.format(this.dateDriveFrom.getDate());
    let to = this.dateDriveTo.getFullYear().toString() + this.format((this.dateDriveTo.getMonth() + 1)) + this.format(this.dateDriveTo.getDate());
    this.getDrive(from, to);
  }

  findCpuHistory() {
    let from = this.dateCpuFrom.getFullYear().toString() + this.format((this.dateCpuFrom.getMonth() + 1)) + this.format(this.dateCpuFrom.getDate());
    let to = this.dateCpuTo.getFullYear().toString() + this.format((this.dateCpuTo.getMonth() + 1)) + this.format(this.dateCpuTo.getDate());
    this.getCpu(from, to);
  }

  pageChangedRam(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.memoryHistoryByPage = this.memoryHistory.slice(startItem, endItem);
  }

  pageChangedDrive(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.driveHistoryByPage = this.driveHistory.slice(startItem, endItem);
  }

  pageChangedCpu(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.cpuHistoryByPage = this.cpuHistory.slice(startItem, endItem);
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
    chart.data.datasets.pop();
    chart.update();
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
