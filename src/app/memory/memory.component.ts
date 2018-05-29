import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../_services/memory.service';
import { Chart } from 'chart.js';
import { GraphService } from '../_services/graph.service';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

  memoryNode:any;
  PieChart:any;

  constructor( private _memoryService:MemoryService, private graphService: GraphService ) { }

  ngOnInit() {

    this.memoryNode = this._memoryService.getMemory("node1");



      this.PieChart = new Chart('pieChart', {
          type: 'bar',
          data: {
              datasets: [{
                  backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 99, 0)', 'rgb(55, 199, 40)'],
                  data: [this.memoryNode.memoriaEnUso, this.memoryNode.memoriaLibre, this.memoryNode.memoriaTotal]
              }],

              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: [
                  'Memoria en uso',
                  'Memoria libre',
                  'Memoria total'
              ]
          },
          options: {

            },
            elements: {
              pointStyle: 'circle'
            }
          }
      );
    }
}
