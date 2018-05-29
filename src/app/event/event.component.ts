import { Component, OnInit } from '@angular/core';
import { Event } from '../_models/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  events:Event[] = [{ nombreEvento:"Evento1", idEvento:1, activo: true }, { nombreEvento:"Evento2", idEvento:2, activo: false } ];

  constructor() { }

  ngOnInit() {

  }

}
