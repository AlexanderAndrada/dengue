import { Component, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators }  from 'ngx-custom-validators';


import { SharedService } from '../../../../develar-commons/shared-service';

//import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { User } from '../../user';
import { UserService } from '../../user.service';

const HOME = "/";
const LIST = "../../";
const CHANGEPASSWD = "/ingresar/clave";
const NAVANCE = 'webform';
const ESTADO = 'pendiente';

function formatModuleRoleList(arr:Array<any>, mod:string, rol:string):Array<any>{
  let pair = mod + ":" + rol;
  if(arr.indexOf(pair) === -1){
    arr.push(pair);
  }
  return arr;
}

function initModuleRoleList(arr, model){
}


@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent implements OnInit {
  pageTitle: string = 'Perfil de Usuario';

  public form: FormGroup;
  public _openEditor = false;
  
  submitted = false;

  users: User[] = [];

  model: User;
  modelId:  string;
  estados:  Array<any>;
  avances:  Array<any>;
  lroles:   Array<any>;
  lmodulos: Array<any>;
  termsofuse: boolean;
  moduleRoleArray: Array<any> = [];






  constructor( 
      private router: Router,
      private fb: FormBuilder, 
      private _sharedService: SharedService,
      private route: ActivatedRoute,
      private userService: UserService
    ){
      this._sharedService.emitChange(this.pageTitle);
    }


  ngOnInit() {
    this.estados = this.userService.getEstados();
    this.avances = this.userService.getAvances();
    this.lroles = this.userService.getRoles();
    this.lmodulos = this.userService.getModulos();
    this.termsofuse = false;

    this.modelId =  this.route.snapshot.paramMap.get('id');

    this.form = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
      email:    ['', Validators.compose([Validators.required, CustomValidators.email])],
      displayName: ['', Validators.compose([Validators.required ])],
      provider: ['', Validators.compose([Validators.required ])],
      estado:   ['', Validators.compose([Validators.required ])],
      navance:  ['', Validators.compose([Validators.required ])],

      externalProfile: '',
      localProfile: '',
      providerId: '',
      roles:      '',
      modulos:    '',
 
      //range: [null, Validators.compose([Validators.required, CustomValidators.range([5, 9])])],
      //url: [null, Validators.compose([Validators.required, CustomValidators.url])],
      //date: [null, Validators.compose([Validators.required, CustomValidators.date])],
      //creditCard: [null, Validators.compose([Validators.required, CustomValidators.creditCard])],
      //phone: [null, Validators.compose([Validators.required, CustomValidators.phone('en-US')])],
      //gender: [null, Validators.required],

    });

    this.userService.getUser(this.modelId).then(user => {
      this.model = user;
      this.model.id = this.model._id;
      this.termsofuse = user.termscond ? true : false;

      this.form.setValue({
        username: this.model.username,
        email: this.model.email || 'no definido',
        displayName: this.model.displayName || 'no definido',
        provider: this.model.provider || 'local',
        providerId: this.model.providerId || this.model.username,
        estado: this.model.estado || 'pendiente' ,
        navance: this.model.navance || 'webform' ,
        roles: this.model.roles || 'operador' ,
        modulos: this.model.modulos || 'core' ,
        externalProfile: this.model.externalProfile || false,
        localProfile: this.model.localProfile || false,

      });
      this.moduleRoleArray = this.model.moduleroles || [];


    });

  }

//[disabled]="!form.valid" 
  onSubmit() {
    this.model = this.initUserForSave();
    this.userService.update(this.model).then(user => {
      this.router.navigate(['/develar/entidades/usuarios']);
    });
  }

  delModuleRoles(data: string):void {
    this.moduleRoleArray.splice(this.moduleRoleArray.indexOf(data),1);
  }

  addModuleRoles(){
    formatModuleRoleList(this.moduleRoleArray, this.form.value.modulos,this.form.value.roles);
  }
 
  initUserForSave(): User {
    let formModel = this.form.value;
 
    // return new `User` object containing a combination of original user value(s)
    // and copies of changed form model values
    this.model.username = formModel.username;
    this.model.email = formModel.email;
    this.model.displayName = formModel.displayName;
    this.model.provider = formModel.provider;
    this.model.providerId = formModel.providerId;
    this.model.navance = formModel.navance;
    this.model.estado = formModel.estado;
    this.model.roles = formModel.roles;
    this.model.modulos = formModel.modulos;
    this.model.moduleroles = this.moduleRoleArray;
    this.model.externalProfile = formModel.externalProfile;
    this.model.localProfile = formModel.localProfile;
    if(!this.model.verificado){
      this.model.verificado = {
        mail: false,
        feaprobado: new Date().getTime(),
        adminuser: ''
      }

    }

    return this.model;
  }

  ngOnChanges() {
  }

  get debugMe(){
    return JSON.stringify(this.model);
  }

  closeEditor(target){
    this.router.navigate([target, 'usuarios'], { relativeTo: this.route });
  }

  editCancel(){
    this.closeEditor(LIST);
  }

  changePassword(){
    this.router.navigate([CHANGEPASSWD, this.modelId]);
  }

  updateUserList(users:User[]){
    this.users = users;
    if(this.users && this.users.length){
    }
  }

}
