import { Component, OnInit } from '@angular/core';
import { AgentService } from '../_services/agent.service';
import { Agent } from '../_models/logAgent';
import { ListNodes } from '../_services/listNodes.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  nodesNames:string[] = [];
  listLogs:Agent[] = [];
  current_page = 1;
  records_per_page = 3;
  nodeName: string;
  dateFrom: Date = new Date();
  dateTo: Date = new Date();

  constructor( private _agentService:AgentService,
                private _listNodes:ListNodes) { }

  ngOnInit() {
    this._listNodes.getNodesNames().subscribe(data => {
      for(let node in data){
        if(data[node] != "syslog"){
          this.nodesNames.push(data[node]);
        }
      }
    });
  }

  searchLogs() {
    //Formateo fechas
    let from =  this.dateFrom.getFullYear().toString() + "-" + this.format(this.dateFrom.getMonth() + 1) + "-" + this.format(this.dateFrom.getDate());
    let to = this.dateTo.getFullYear().toString() + "-" + this.format(this.dateTo.getMonth() + 1) + "-" + this.format(this.dateTo.getDate());

    this._agentService.getAgentLogs(this.nodeName, from, to).subscribe(ret => {
      this.listLogs = ret.body;
    });
  }

  format(numero: number): string {
    let result = numero.toString();
    if (result.length < 2) {
      return "0" + result;
    } else {
      return result;
    }
  }
}
