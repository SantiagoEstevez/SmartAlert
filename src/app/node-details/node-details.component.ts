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

@Component({
  selector: 'app-node-details',
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.css']
})
export class NodeDetailsComponent implements OnInit {
  dateDriveInput: Date = new Date();
  dateDriveOutput: Date = new Date();
  nodeName:string;
  node: NodeDetails = new NodeDetails();
  memoryHistory: Memory[] = [];
  driveHistory: HardDiskInfo[] = [];
  
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

    this.graphService.getMemoryHistory(this.nodeName, '20180615', '20180630').subscribe(res => {
      this.memoryHistory = res.body;
    });

    this.graphService.getDriveHistory(this.nodeName, '20180615', '20180630').subscribe(res => {
      this.driveHistory = res.body;
    });
  }

  buscar() {
    alert("fecha desde: " + this.dateDriveInput.getDate() + " fecha hasta: " + this.dateDriveOutput.getDate());
  }
}
