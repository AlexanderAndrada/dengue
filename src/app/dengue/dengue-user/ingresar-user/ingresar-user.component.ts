import { Component, OnInit, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotificationService } from '../../../develar-commons/notifications.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { DengueUserService } from '../dengue-user.service';

@Component({
  selector: 'ingresar-user',
  templateUrl: './ingresar-user.component.html',
  styleUrls: ['./ingresar-user.component.scss']
})
export class IngresarUserComponent implements OnInit {

  form: FormGroup;
  private userListener: Subject<Usuario>;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _userService: DengueUserService,
    private _notificacionService: NotificationService,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initGroup();
  }

  initGroup(): void {
    this.form = this._formBuilder.group({
      username: ["", Validators.compose([Validators.email,Validators.required])  ],
      password: ["", Validators.required],
    });
  }

  onSubmit(): void {
    let datos = new UserPassword();
    datos = this.form.value;
    this.login(datos)
  }

  onNavigateHome(): void {
    this._router.navigate(['']);
  }

  login(datos: UserPassword): void {

    this._userService.login(datos).then((user) => {
      console.log("usuario logueado --> %o",user)
      if (user) {
        // this._notificacionService.success("Inicio de sesión correcto");
        this.loadLoginUser();
        this._router.navigate(['/dengue/usuario/dashboard']);
      } else {
        this._notificacionService.error("Contraseña o correo incorrecto");
      }
    }).catch((err) => {
      
      this._notificacionService.error("Contraseña o usuario incorrecto");
    });
  }

  private loadLoginUser(): void {
    this.userListener = this._userService.initLoginUser();

    this.userListener.subscribe((user) => {
      if (user) {
        console.log(user);
        // this.goHome();
      }
    });
  }
}

export class UserPassword {
  username: string;
  password: string;
}
