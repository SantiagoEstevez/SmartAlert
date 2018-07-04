import { Component, OnInit } from '@angular/core';
import { ListNodes } from '../_services/listNodes.service';
import { MemoryComponent } from '../memory/memory.component';
import { HardDiskComponent } from '../hard-disk/hard-disk.component'
import {ActivatedRoute} from '@angular/router';
import { NodeDetails } from '../_models/node-details';
import { Memory } from '../_models/memory';
import { MemoryService } from '../_services/memory.service';
import { GraphService } from '../_services/graph.service';
import { HardDiskInfo } from '../_models/hardDisk';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

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

  nodeName:string;
  node: NodeDetails = new NodeDetails();
  memoryHistory: Memory[] = [];
  memoryHistoryByPage: Memory[] = [];
  driveHistory: HardDiskInfo[] = [];
  driveHistoryByPage: HardDiskInfo[] = [];

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

    this.dateDriveFrom.setDate(this.dateDriveFrom.getDate() - 15);
    this.dateRamFrom.setDate(this.dateRamFrom.getDate() - 15);
    this.dateCpuFrom.setDate(this.dateCpuFrom.getDate() - 15);

    let from = this.dateDriveFrom.getFullYear().toString() + this.format((this.dateDriveFrom.getMonth() + 1)) + this.format(this.dateDriveFrom.getDate());
    let to = this.dateDriveTo.getFullYear().toString() + this.format((this.dateDriveTo.getMonth() + 1)) + this.format(this.dateDriveTo.getDate());

    this.getRam(from, to);
    this.getDrive(from, to);
  }

  getRam(from: string, to: string) {
    this.graphService.getMemoryHistory(this.nodeName, from, to).subscribe(res => {
      this.memoryHistory = res.body;

      for (let i in this.memoryHistory) {
        let libre = this.memoryHistory[i].memoriaLibre;
        let total = this.memoryHistory[i].memoriaTotal;
        let usado = this.memoryHistory[i].memoriaEnUso;

        this.memoryHistory[i].pEnUso = (usado * 100) / total;
        this.memoryHistory[i].pLibre = (libre * 100) / total;
      }

      this.memoryHistoryByPage = this.memoryHistory.slice(0, 20);
    });
  }

  getDrive(from: string, to: string) {
    this.graphService.getDriveHistory(this.nodeName, from, to).subscribe(res => {
      this.driveHistory = res.body;

      for (let i in this.driveHistory) {
        let libre = this.driveHistory[i].espacioDisponible;
        let total = this.driveHistory[i].espacioTotal;
        let usado = total - libre;

        this.driveHistory[i].pDisponible = (libre * 100) / total;
        this.driveHistory[i].pUso = (usado * 100) / total;
      }

      this.driveHistoryByPage = this.driveHistory.slice(0, 20);
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

  /*findCpuHistory() {
    let from = this.dateCpuFrom.getFullYear().toString() + this.format((this.dateCpuFrom.getMonth() + 1))+ this.format(this.dateCpuFrom.getDate());
    let to = this.dateCpuFrom.getFullYear().toString() + this.format((this.dateCpuFrom.getMonth() + 1)) + this.format(this.dateCpuFrom.getDate());

    this.graphService.getDriveHistory(this.nodeName, from, to).subscribe(res => {
      this.driveHistory = res.body;
    }); 

    this.returnedArray = this.contentArray.slice(0, 10);
  }*/

  format(numero: number): string {
    let result = numero.toString();
    if (result.length < 2) {
      return "0" + result;
    } else {
      return result;
    }
  }
}
