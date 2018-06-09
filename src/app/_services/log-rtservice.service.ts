import { Injectable } from '@angular/core';
import { Message } from '../_models/logMessage'
import { Observable, Subject } from 'rxjs';
import { WebSocketService } from '../_services/web-socket.service'

@Injectable({
  providedIn: 'root'
})
export class LogRTServiceService {

  public messages: Subject<Message>;


}
