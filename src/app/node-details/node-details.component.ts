import { Component, OnInit } from '@angular/core';
import { ListNodes } from '../_services/listNodes.service';
import { MemoryComponent } from '../memory/memory.component';

@Component({
  selector: 'app-node-details',
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.css']
})
export class NodeDetailsComponent implements OnInit {

  constructor( private _listNodesService:ListNodes ) {

  }

  ngOnInit() {

  }

}
