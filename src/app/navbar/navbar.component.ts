import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service'
import { ToastrService } from 'ngx-toastr';
import { WebSocketService } from '../_services/web-socket.service';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [ WebSocketService ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  user: User = new User();
  messageFromServer: string;
  ws: WebSocket;

  constructor(
    public authService: AuthService,
    private toastr: ToastrService,
    private wsService: WebSocketService
  ) {

    this.wsService.createObservableSocket('ws://localhost:8080/Proyecto2018/alert')
      .subscribe(data => {
        if(data != ""){
          this.toastr.info(data, 'Notification');
        }

        this.wsService.sendMessage("GiveMeMoreMessagesPls<3");

      })

      this.user = this.authService.getUserCookie();
    };

}
