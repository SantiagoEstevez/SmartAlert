import { Component, OnInit, Input } from '@angular/core';
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
export class NavbarComponent implements OnInit{

  @Input() user: User = new User();
  messageFromServer: string;
  ws: WebSocket;

  constructor(
    public authService: AuthService,
    private toastr: ToastrService,
    private wsService: WebSocketService
  ) {

    this.wsService.createObservableSocket(`${environment.ws_urlbase}alert`)
      .subscribe(data => {
        if(data != "" && data != "Disfruta de SmartAlert!"){
          if (data.split("?")[1] == this.user.username) {
            console.log(this.user.username)
            data = data.replace("?" + this.user.username, "")
            this.toastr.info(data, 'NOTIFICACIÓN', {
              timeOut: 0,
              extendedTimeOut: 0
            });
          }
        }

        this.wsService.sendMessage("GiveMeMoreMessagesPls<3");

      })
    };

    ngOnInit() {
      this.init();
    }

    init() {
      this.user = this.authService.getUserCookie();
      return true;
    }

    logout() {
      this.user.username = "";
      this.authService.logout()
    }
}
