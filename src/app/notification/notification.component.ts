import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../_services/notification.service';
import { Notification } from '../_models/notification';
import { EventType } from '../_models/EventType';
import { Event } from '../_models/event';
import { EventService } from '../_services/event.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifs: Notification [] = [];
  eventTypes: EventType[] = [];
  events: Event[] = [];

  constructor(
    private eventService: EventService,
    public notificationService : NotificationService,
  ) { }

  ngOnInit() {

    //Carga la lista de notificaciones y ademas agrega el nombre del evento y del tipo.
    this.notificationService.getListNotificationsByUser().subscribe(res => {
      this.notifs = res.body;

      this.eventService.getListEvents().subscribe(res => {
        this.events = res.body;

        this.eventService.getTypes().subscribe(res => {
          this.eventTypes = res.body;

          for(let i in this.notifs){
            this.notifs[i].name_evento_global = this.events.find(x => x.idEvento == this.notifs[i].id_evento_global).nombreEvento;
            this.notifs[i].name_tipo = this.eventTypes.find(x => x.id_tipo == this.notifs[i].tipo).nombre_tipo;
          }
        });
      });
    })
  }

}
