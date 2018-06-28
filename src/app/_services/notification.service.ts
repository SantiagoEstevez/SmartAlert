import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Notification } from '../_models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient
  ) { }

  getListNotificationsByUser() {
    const url = `${environment.api_urlbase}rest/notis/getMisNotis`;
    return this.http.get<Notification[]>(url, {observe: 'response'}).pipe(res => res);
  };

  getListNotifications() {
    const url = `${environment.api_urlbase}rest/notis/getNotisTodas`;
    return this.http.get<Notification[]>(url, {observe: 'response'}).pipe(res => res);
  };
}
