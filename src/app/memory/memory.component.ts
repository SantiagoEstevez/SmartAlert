import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../_services/memory.service';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

  memoryNode:any;

  constructor( private _memoryService:MemoryService ) { }

  ngOnInit() {

    this.memoryNode = this._memoryService.getMemory();

  }

}
