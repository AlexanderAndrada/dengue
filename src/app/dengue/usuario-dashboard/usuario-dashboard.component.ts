import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DengueUserService } from '../dengue-user/dengue-user.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-usuario-dashboard',
  templateUrl: './usuario-dashboard.component.html',
  styleUrls: ['./usuario-dashboard.component.scss']
})
export class UsuarioDashboardComponent implements OnInit {

  user$ : BehaviorSubject<Usuario>;

  constructor(
    private _userService: DengueUserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.user$ = this._userService.userEmitter;
    this._userService.initLoginUser().subscribe((loggedIn) => {
      if (!loggedIn) {
        this._router.navigate(['/web', 'ingresar']);
      }
    });
  }


}
