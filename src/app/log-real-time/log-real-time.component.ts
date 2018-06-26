import { Component } from '@angular/core';
import { WebSocketService } from '../_services/web-socket.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-log-real-time',
  templateUrl: './log-real-time.component.html',
  providers: [ WebSocketService ],
  styleUrls: ['./log-real-time.component.css']
})
export class LogRealTimeComponent {
  messageFromServer: string;
  ws: WebSocket;
  constructor(private wsService: WebSocketService, private http: HttpClient){
    this.wsService.createObservableSocket('ws://localhost:8080/Proyecto2018/alert')
      .subscribe(data => {
        this.messageFromServer = data;
      });
  }
}
