import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  addUser(newUser: User) {
    const urlHead = `${environment.api_urlbase}rest/usuario/alta/${newUser.username}/${newUser.password}/${newUser.mail}/${newUser.numero_cel}`;
    return this.http.post(urlHead, "").pipe(res => res);
  }

  getUsers() {
    const urlHead = `${environment.api_urlbase}rest/usuario/listarUsuarios`;
    return this.http.get<User[]>(urlHead, {observe: 'response'}).pipe(res => res);
  }
}
