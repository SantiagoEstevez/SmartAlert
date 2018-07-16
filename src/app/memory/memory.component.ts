import { Component, OnInit, Input } from '@angular/core';
import { MemoryService } from '../_services/memory.service';
import { Chart } from 'chart.js';
import { GraphService } from '../_services/graph.service';
import { Memory } from '../_models/memory';
import { WebSocketService } from '../_services/web-socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  providers: [ WebSocketService ],
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

  memoryNode:Memory = new Memory();
  PieChart:any;

  @Input()
  nodeName: string;

  constructor( private _memoryService:MemoryService,
                private graphService: GraphService,
                private wsService:WebSocketService,
                private route:ActivatedRoute) {

    this.wsService.createObservableSocket('ws://localhost:8080/Proyecto2018/realtime/ram')
      .subscribe(data => {

        this.memoryNode.memoriaEnUso = +data.split(';')[0];
        this.memoryNode.memoriaLibre = +data.split(';')[1];
        this.memoryNode.memoriaTotal = +data.split(';')[2];

        this.memoryNode.pEnUso = (this.memoryNode.memoriaEnUso * 100) / this.memoryNode.memoriaTotal;
        this.memoryNode.pLibre = (this.memoryNode.memoriaLibre * 100) / this.memoryNode.memoriaTotal;

        this.PieChart.data.datasets[0].data[0] = +data.split(';')[0];
        this.PieChart.data.datasets[0].data[1] = +data.split(';')[1];
        this.PieChart.data.datasets[0].data[2] = +data.split(';')[2];
        this.PieChart.update(2000);

        this.wsService.sendMessage(this.nodeName);
      })
  }
  ngOnInit() {

      this.PieChart = new Chart('pieChart', {
          type: 'bar',
          data: {
              datasets: [{
                  label: 'RAM',
                  backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 99, 0)', 'rgb(55, 199, 40)'],
                  data: [0, 0, 0]
              }],
              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: [
                  'En uso',
                  'Libre',
                  'Total'
              ]
          },
          options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
            },
            elements: {
              pointStyle: 'circle'
            }
          }
        );
    }
}
