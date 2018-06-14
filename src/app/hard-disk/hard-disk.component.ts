import { Component, OnInit, Input } from '@angular/core';
import { HardDiskInfo } from '../_models/hardDisk';
import { HardDiskService } from '../_services/hardDisc.service';
import { Chart } from 'chart.js';
import { GraphService } from '../_services/graph.service';

@Component({
  selector: 'app-hard-disk',
  templateUrl: './hard-disk.component.html',
  styleUrls: ['./hard-disk.component.css']
})
export class HardDiskComponent implements OnInit {

  hardDiskInfo:HardDiskInfo;
  DoughnutChart: any;

  @Input()
  nodeName: string;

  constructor( private _hardDiskService:HardDiskService, private graphService: GraphService ) { }

  ngOnInit() {

    this._hardDiskService.getDiskInformation(this.nodeName).subscribe(data => {

      this.hardDiskInfo = data;
      this.DoughnutChart = new Chart('doughnutChart', {
          type: 'doughnut',
          data: {
              datasets: [{
                  backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 99, 0)', 'rgb(255, 0, 132)'],
                  data: [(data["espacioTotal"] - data["espacioDisponible"]), data["espacioDisponible"]]
              }],

              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: [
                  'Ocupado',
                  'Disponible',
              ]
          },
          options: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: 'rgb(0, 0, 0)',
                    usePointStyle: true
                }
            },
            elements: {
              pointStyle: 'circle'
            }
          }
      });
    });
  }
}
