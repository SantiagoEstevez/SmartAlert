import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service'
import { ToastrService } from 'ngx-toastr';
import { WebSocketService } from '../_services/web-socket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [ WebSocketService ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  messageFromServer: string;
  ws: WebSocket;

  constructor(
    public authService: AuthService,
    private toastr: ToastrService,
    private wsService: WebSocketService
  ) {
    this.wsService.createObservableSocket('ws://localhost:8080/Proyecto2018/alert')
      .subscribe(data => {
        this.toastr.info(data, 'Notification');
      })
    };
}
