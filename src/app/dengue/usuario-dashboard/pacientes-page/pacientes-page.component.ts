import { Component, OnInit } from '@angular/core';
import { DengueUserService } from '../../dengue-user/dengue-user.service';
import { Usuario } from '../../models/usuario';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-pacientes-page',
  templateUrl: './pacientes-page.component.html',
  styleUrls: ['./pacientes-page.component.scss']
})
export class PacientesPageComponent implements OnInit {

  constructor(private _userService : DengueUserService) { }
  usuariosList : Observable<Usuario[]>;

  ngOnInit(): void {
    this.usuariosList = this._userService.getAllPacientes();

  } 


}
