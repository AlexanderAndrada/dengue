import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DengueUserService } from '../../dengue-user/dengue-user.service';
import { Reporte } from '../../models/reporte';
import { ContactanosService } from './contactanos.service';
import { NotificationService } from '../../../develar-commons/notifications.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.scss']
})
export class ContactanosComponent implements OnInit {

  formGroup : FormGroup;
  id : string;
  constructor(private _fb : FormBuilder,
    private _router : Router,
    private _userService : DengueUserService,
    private _reporteService : ContactanosService,
    private _notificationService : NotificationService) { }

  ngOnInit(): void {
    this.initGroup();
    this._userService.userEmitter.subscribe(user => {
      if(user){
        this.id = user._id;
      }
    })
  }

  initGroup() : void {
    this.formGroup = this._fb.group({
      description : ['' , [Validators.minLength(6), Validators.required]]
    })
  }

  onSubmit() : void {
    let reporte : Reporte = {
      person_id : this.id,
      description : this.formGroup.value.description,
      fecha : new Date()
    }
    this._reporteService.insert(reporte).then( reporte => {
      this._notificationService.success("Gracias por reportar su inconveniente");
      this.formGroup.reset();
    })

  }

  volver() : void {
    this._router.navigate(['dengue','usuario','dashboard']);
  }
}
