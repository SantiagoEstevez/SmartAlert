import { Component, OnInit, Input } from '@angular/core';
import { HardDiskInfo } from '../_models/hardDisk';
import { HardDiskService } from '../_services/hardDisc.service';
import { Chart } from 'chart.js';
import { GraphService } from '../_services/graph.service';
import { WebSocketService } from '../_services/web-socket.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-hard-disk',
  templateUrl: './hard-disk.component.html',
  providers: [ WebSocketService ],
  styleUrls: ['./hard-disk.component.css']
})
export class HardDiskComponent implements OnInit {

  hardDiskInfo:HardDiskInfo = new HardDiskInfo();
  DoughnutChart: any;

  @Input()
  nodeName: string;

  constructor( private _hardDiskService:HardDiskService,
    private graphService: GraphService,
    private wsService:WebSocketService,
    private route:ActivatedRoute ) {

      this.wsService.createObservableSocket(`${environment.ws_urlbase}realtime/hhd`)
        .subscribe(data => {

          this.hardDiskInfo.espacioDisponible = +data.split(';')[0];
          this.hardDiskInfo.espacioTotal = +data.split(';')[1];
          this.hardDiskInfo.mount = data.split(';')[2];
          let uso = this.hardDiskInfo.espacioTotal - this.hardDiskInfo.espacioDisponible;

          this.hardDiskInfo.pDisponible = (this.hardDiskInfo.espacioDisponible * 100) / this.hardDiskInfo.espacioTotal;
          this.hardDiskInfo.pUso = (uso * 100) / this.hardDiskInfo.espacioTotal;

          this.DoughnutChart.data.datasets[0].data[0] = this.hardDiskInfo.espacioDisponible;
          this.DoughnutChart.data.datasets[0].data[1] = uso;
          this.DoughnutChart.update(2000);

          this.wsService.sendMessage(this.nodeName);
        })
    }

  ngOnInit() {

    this.DoughnutChart = new Chart('doughnutChart', {
        type: 'doughnut',
        data: {
            datasets: [{
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 99, 0)', 'rgb(255, 0, 132)'],
                data: [0, 0]
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
              'Libre',
              'En uso',
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
  }
}
