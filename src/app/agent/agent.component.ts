import { Component, OnInit } from '@angular/core';
import { AgentService } from '../_services/agent.service';
import { Agent } from '../_models/logAgent';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  listLogs:Agent[] = [];
  current_page = 1;
  records_per_page = 3;

  constructor( private _agentService:AgentService ) { }

  ngOnInit() {

  }

  searchLogs() {
    var node = ((document.getElementById("node") as HTMLInputElement).value);
    var date = ((document.getElementById("date") as HTMLInputElement).value);
    date = new Date(date).toISOString().split('T')[0];
    console.log(date);
    //this._agentService.getAgentLogs('node1', '2018-06-03').subscribe(ret => {
    this._agentService.getAgentLogs(node, date).subscribe(ret => {
      this.listLogs = ret.body;
    });
  }
}
