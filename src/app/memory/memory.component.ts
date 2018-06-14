import { Component, OnInit, Input } from '@angular/core';
import { MemoryService } from '../_services/memory.service';
import { Chart } from 'chart.js';
import { GraphService } from '../_services/graph.service';
import { Memory } from '../_models/memory';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

  memoryNode:Memory = new Memory();
  PieChart:any;

  @Input()
  nodeName: string;

  constructor( private _memoryService:MemoryService, private graphService: GraphService ) { }

  ngOnInit() {
      //this.memoryNode = { memoriaLibre:2821, memoriaTotal:2948, memoriaEnUso:126};
    this._memoryService.getMemory(this.nodeName).subscribe(data => {

      this.memoryNode = data;
      this.PieChart = new Chart('pieChart', {
          type: 'bar',
          data: {
              datasets: [{
                  backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 99, 0)', 'rgb(55, 199, 40)'],
                  data: [data["memoriaEnUso"], data["memoriaLibre"], data["memoriaTotal"]]
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
      });
    }
}
