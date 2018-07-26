import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  modalRef: BsModalRef;
  password2: String;
  user: User;
  users2: User[] = [];
  validate: boolean;
  verAdd: boolean;

  constructor(
    private userService: UserService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.validate = false;
    this.verAdd = false;
    this.user = new User();

    this.userService.getUsers().subscribe(res => {
      console.log(res.body)
      this.users2 = res.body;
    })
  }

  addUser(template: TemplateRef<any>) {
    if (!this.user.username || !this.user.password || !this.user.mail || !this.user.numero_cel || !this.password2) {
      this.validate = true;
    } else {
      if (this.user.username.trim() == "" || this.user.password.trim() == "" || this.user.mail.trim() == "" || this.user.numero_cel.trim() == "" || this.password2.trim() == "") {
        this.validate = true;
      } else {
        if (this.user.password != this.password2) {
          alert("Las contraseñas no coinciden");
        } else {
          this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
        }
      }
    }
  }

  confirm(): void {
    this.modalRef.hide();
    this.userService.addUser(this.user).subscribe(res => {
      this.init();
    })
  }

  decline(): void {
    this.modalRef.hide();
  }

  mostrarAdd() {
    this.verAdd = !this.verAdd;
  }
}
