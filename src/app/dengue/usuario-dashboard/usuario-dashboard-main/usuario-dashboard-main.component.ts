import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { DengueUserService } from '../../dengue-user/dengue-user.service';

@Component({
  selector: 'app-usuario-dashboard-main',
  templateUrl: './usuario-dashboard-main.component.html',
  styleUrls: ['./usuario-dashboard-main.component.scss']
})
export class UsuarioDashboardMainComponent implements OnInit {

  user$ : BehaviorSubject<Usuario>;
  constructor(private _userService : DengueUserService) { }

  ngOnInit(): void {
    this.user$ = this._userService.userEmitter;
  }

}
