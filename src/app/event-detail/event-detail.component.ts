import { Component, OnInit } from '@angular/core';
import { EventService } from '../_services/event.service';
import { Event } from '../_models/event';
import { EventConfiguration } from '../_models/eventConf';
import { EventType } from '../_models/EventType';
import { AlertType } from '../_models/alert-type';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event;
  eventConfigs: EventConfiguration[] = [];
  eventTypes: EventType[] = [];
  alertsTypes: AlertType[] = [];
  
  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.eventService.getTypes().subscribe(res => {
      this.eventTypes = res.body;
    });

    this.eventService.getAlerts().subscribe(res => {
      this.alertsTypes = res.body;
    });

    this.event = this.eventService.getEventCookie();
    this.eventService.getListConfigsByEvent(this.event.idEvento).subscribe(res => {
      this.eventConfigs = res.body;
      console.log(this.eventConfigs);
    });
  }

  saveDetails() {
    this.eventService.editConfigs(this.event.idEvento, this.eventConfigs);
    location.reload();
  }


}
