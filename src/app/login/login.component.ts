import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service'
import { User } from '../_models/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  oUser: User;

  ngOnInit() {
    this.oUser = new User();
  }
}
