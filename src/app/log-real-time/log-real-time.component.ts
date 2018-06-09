import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild  } from '@angular/core';
import { LogRTServiceService } from '../_services/log-rtservice.service';
import { Message } from '../_models/logMessage';
import { WebSocketService } from '../_services/web-socket.service';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
//import { Config } from '../class/config'

@Component({
  selector: 'app-log-real-time',
  templateUrl: './log-real-time.component.html',
  styleUrls: ['./log-real-time.component.css']
})
export class LogRealTimeComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

   private message: Message;
   private messages: Message[];
  chatService:LogRTServiceService
  videoactual;
  private sub: any;
   //webSocket: WebsocketService;

   constructor(webSocket: WebSocketService, private route: ActivatedRoute) {
     this.sub = this.route.params.subscribe(params => {
        this.videoactual = params['nombre']; // (+) converts string 'id' to a number
        // In a real app: dispatch action to load the details here.
     });
    }

   ngOnInit() {
     this.scrollToBottom();
     this.message = new Message();
     this.messages = [];

     this.chatService.messages.subscribe(msg => {
       msg.isMe = false;
       console.log(msg);
       msg.date = new Date();
       this.messages.push(msg);
     });
   }

   ngAfterViewChecked() {
         this.scrollToBottom();
     }

     scrollToBottom(): void {
         try {
             this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
         } catch(err) { }
     }

   sendMsg() {
     this.message.isMe = true;
     this.message.date = new Date();
     this.messages.push(this.message);
     this.message = new Message();
   }

   enterMsg(event) {
     if(event.keyCode == 13) {
       this.message.isMe = true;
       this.message.author = localStorage.getItem("name");
       this.message.date = new Date();
       this.messages.push(this.message);
       this.message = new Message();
     }
   }


}
