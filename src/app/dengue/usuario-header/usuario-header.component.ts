import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../models/usuario';
import { NotificationService } from '../../develar-commons/notifications.service';
import { DengueUserService } from '../dengue-user/dengue-user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuario-header',
  templateUrl: './usuario-header.component.html',
  styleUrls: ['./usuario-header.component.scss']
})
export class UsuarioHeaderComponent implements OnInit {

  @Input() user$: Observable<Usuario>;

  showToolbar : boolean = false;


  constructor(private _userService : DengueUserService,
    private _notificationService : NotificationService,
    private _router : Router) { }

  ngOnInit(): void {
    this.showToolbar = true;
  }

  logout() : void {
    this._userService.logout().then(msj => {
      this._notificationService.success("Gracias por confiar en nosotros");
      this.exit();
    }).catch(err => {
      this._notificationService.error("Se ha producido un error")
    });
  }

  toggleUserEditData(): void {
  }

  cargarSintomas() : void {
    this._router.navigate(['dengue','usuario','dashboard','form-diario'])
  }


  exit() : void {
    this._router.navigateByUrl('');
  }

}
