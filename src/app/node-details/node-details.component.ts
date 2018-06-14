import { Component, OnInit } from '@angular/core';
import { ListNodes } from '../_services/listNodes.service';
import { MemoryComponent } from '../memory/memory.component';
import { HardDiskComponent } from '../hard-disk/hard-disk.component'
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-node-details',
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.css']
})
export class NodeDetailsComponent implements OnInit {

  nodeName:string;

  constructor(private _listNodesService:ListNodes,
              private route:ActivatedRoute) {

  }

  ngOnInit() {
    this.nodeName = this.route.snapshot.params['name'];
  }

}
