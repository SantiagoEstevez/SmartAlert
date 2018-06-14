import { Component, OnInit } from '@angular/core';
import { Event } from '../_models/event';
import { EventService } from '../_services/event.service';
import { EventConfiguration } from '../_models/eventConf';
import { EventType } from '../_models/EventType';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  verAdd: boolean = false;
  events: Event[] = [];
  eventTypes: EventType[] = [];
  eventConfigs: EventConfiguration[] = [];

  constructor(
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.eventService.getListEvents().subscribe(res => {
      this.events = res.body;
    });

    this.eventService.getTypes().subscribe(res => {
      this.eventTypes = res.body;
    });
  }

  mostrarAdd(){
    this.verAdd = !this.verAdd;
  }

  addEvent(eventName: string, eventDetail: string, eventTipe: string, eventAlert: string) {
    this.eventConfigs = [];

    let config: EventConfiguration;
    config.tipo = +eventTipe;
    config.alerta = eventAlert;
    this.eventConfigs.push(config);

    this.eventService.addEvent(eventName, eventDetail, this.eventConfigs);    
  }
}
