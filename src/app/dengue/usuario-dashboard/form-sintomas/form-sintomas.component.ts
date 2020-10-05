import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DaoService } from '../../../develar-commons/dao.service';
import { Usuario, Sintomas } from '../../models/usuario';
import { DengueUserService } from '../../dengue-user/dengue-user.service';
import { NotificationService } from '../../../develar-commons/notifications.service';

@Component({
  selector: 'app-form-sintomas',
  templateUrl: './form-sintomas.component.html',
  styleUrls: ['./form-sintomas.component.scss']
})
export class FormSintomasComponent implements OnInit {

  formGroup : FormGroup;
  id : string;
  usuario : Usuario;
  constructor(private _fb: FormBuilder,
    private _router: Router,
    private daoService : DaoService,
    private _usuarioService : DengueUserService,
    private _notificationService : NotificationService) { }

  ngOnInit(): void {
    this.initForm();
    this._usuarioService.userEmitter.subscribe( user => {
      if(user){
        this.id = user._id;
        this.usuario = user;
      }
    })
  }

  initForm() : void {
    this.formGroup = this._fb.group({
      nauseas : [false],
      vomitos : [false],
      cabeza : [false],
      sarpullido : [false],
      ojos : [false],
      musculares : [false],
      description : ['']
    })

  }

  onSubmit() : void {
    let sintomas : Sintomas;
    sintomas = this.formGroup.value;
    sintomas.person_id = this.id;

    this.usuario.sintomas.push(sintomas);
    
     this.daoService.partialUpdate<Usuario>('dengueUser', this.id, this.usuario).then(usuario => {
       if(usuario){
         console.log(usuario)
         this._notificationService.success("Formulario de sintomas cargado con éxito")
       }
  })
  }

  volver() : void {
    this._router.navigate(['dengue','usuario','dashboard']);
  }

}
