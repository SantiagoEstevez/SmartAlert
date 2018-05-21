import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from '../_services/auth.service'
import { GraphService } from '../_services/graph.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chart = [];
  DoughnutChart: any;
  PieChart: any;

  constructor(
    private authService: AuthService,
    private graphService: GraphService
  ) { }

  ngOnInit() {
    /*this._weather.dailyForecast()
      .subscribe(res => {
        let temp_max = res['list'].map(res => res.main.temp_max);
        let temp_min = res['list'].map(res => res.main.temp_min);
        let alldates = res['list'].map(res => res.dt);

        let weatherDates = [];
        alldates.forEach((res) => {
          let jsdate = new Date(res * 1000)
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
        });

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              { 
                data: temp_max,
                borderColor: "#3cba9f",
                fill: false
              },
              { 
                data: temp_min,
                borderColor: "#ffcc00",
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
      });*/

   this.DoughnutChart = new Chart('doughnutChart', {
        type: 'doughnut',
        data: {
            datasets: [{
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 99, 0)', 'rgb(255, 0, 132)'],
                data: [10, 20, 30]
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Red',
                'Yellow',
                'Blue'
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

    this.graphService.getMemory().subscribe(res => {
      this.PieChart = new Chart('pieChart', {
          type: 'pie',
          data: {
              datasets: [{
                  backgroundColor: ['rgb(255, 99, 132)'],
                  data: [res]
              }],
          
              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: [
                  'Memoria libre'
              ]
          },
          options: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: 'rgb(255, 99, 132)',
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
