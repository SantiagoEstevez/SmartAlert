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
  node:string;

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
    var dateIni = ((document.getElementById("date1") as HTMLInputElement).value);
    var dateFin = ((document.getElementById("date2") as HTMLInputElement).value);
    dateIni = new Date(dateIni).toISOString().split('T')[0];
    dateFin = new Date(dateFin).toISOString().split('T')[0];

    this._agentService.getAgentLogs(this.node, dateIni, dateFin).subscribe(ret => {
      this.listLogs = ret.body;
    });
  }
}
