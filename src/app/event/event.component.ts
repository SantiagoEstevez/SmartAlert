import { Component, OnInit, ElementRef, ViewChild, Renderer2, TemplateRef } from '@angular/core';
import { Event } from '../_models/event';
import { EventService } from '../_services/event.service';
import { EventConfiguration } from '../_models/eventConf';
import { EventType } from '../_models/EventType';
import { AlertType } from '../_models/alert-type';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  modalRef: BsModalRef;
  verAdd: boolean = false;

  eventTypes: EventType[] = [];
  alertsTypes: AlertType[] = [];

  nombreEvento: string;
  events: Event[] = [];
  eventConfigs: EventConfiguration[] = [];
  id: number = 0;

  constructor(
    private eventService: EventService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.init();

    this.eventService.getTypes().subscribe(res => {
      this.eventTypes = res.body;
    });

    this.eventService.getAlerts().subscribe(res => {
      this.alertsTypes = res.body;
    });
  }

  init() {
    this.nombreEvento = "";
    this.eventConfigs = [];

    this.getEvents();
    this.cofigAdd();
  }

  getEvents(): void {
    this.eventService.getListEvents().subscribe(res => {
      this.events = res.body;
    });
  }

  mostrarAdd(): void {
    this.verAdd = !this.verAdd;
  }

  cofigAdd(): void {
    this.id ++;

    let config: EventConfiguration = new EventConfiguration();
    config.operador = ">";
    config.alerta = "";
    config.nivel = 0;
    config.tipo = 1;
    this.eventConfigs.push(config);
  }

  removeConfig(config: EventConfiguration) {
    var index = this.eventConfigs.indexOf(config, 0);
    if (index > -1) {
      this.eventConfigs.splice(index, 1);
    }
  }

  addEvent(template: TemplateRef<any>) {
    this.eventConfigs.forEach((item, index) => {
      if(item.alerta == "") {
        this.eventConfigs.splice(index,1);
      } else {
        item.alerta = item.operador + item.alerta;
      }
    }); 

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.eventService.addEvent(this.nombreEvento).subscribe(res => {
      this.eventService.addConfigs(this.nombreEvento, this.eventConfigs);
      this.init();
      this.mostrarAdd();
    });
  }
 
  decline(): void {
    this.modalRef.hide();
  }
  
  swichStatus(swich: boolean, idEvent: number): void {
    if (swich) {
      this.eventService.activeEvent(idEvent).subscribe(res => {
        this.init();
      });
    } else {
      this.eventService.disableEvent(idEvent).subscribe(res => {
        this.init();
      });
    }
  }

  swichSuscribe(swich: boolean, idEvent: number): void {
    if (swich) {
      this.eventService.suscribeEvent(idEvent).subscribe(res => {
        this.init();
      });
    } else {
      this.eventService.unsuscribeEvent(idEvent).subscribe(res => {
        this.init();
      });
    }
  }

  detail(event: Event) {
    console.log(event);
    this.eventService.setEventCookie(event);
    this.router.navigate(['events/detail']);
  }
}
