import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { personModel } from '../../../entities/person/person';
import { NotificationService } from '../../../develar-commons/notifications.service';
import { DengueUserService } from '../dengue-user.service';
import { Usuario } from '../../models/usuario';
import { PreguntaSecreta, DengueHelper } from '../../dengue.helper';
import { InstructivoNumTramiteModalComponent } from '../../../develar-commons/instructivo-num-tramite-modal/instructivo-num-tramite-modal.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-registrar-user',
  templateUrl: './registrar-user.component.html',
  styleUrls: ['./registrar-user.component.scss']
})
export class RegistrarUserComponent implements OnInit {

  form: FormGroup;
  title: string = 'Registrarse';
  button_label: string = 'Registrarse';
  ruta: Array<string> = ['dengue', 'ingresar']
  showPassword: boolean = false;
  private emailOrigen: string;
  showForm: boolean = false;
  public docBelongsTo = { error: '' };
  private password = new FormControl('', Validators.required);
  private confirmPassword = new FormControl(
    '',
    CustomValidators.equalTo(this.password),
  );
  public preguntasSecretas: PreguntaSecreta[];
  public tcompPersonaFisica: Array<any> = personModel.tipoDocumPF;
  public usuario: Usuario;
  public isEdit: boolean = false;
  constructor(private _fb: FormBuilder, private _dialog: MatDialog,
    private _userService: DengueUserService,
    private _notificacionService: NotificationService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute) {

    this.preguntasSecretas = DengueHelper.getPreguntasSecretasOptList();

  }

  ngOnInit(): void {
    let id = this._activatedRouter.snapshot.params.id;
    if (id) {
      this.initUser(id);
    } else {
      this.initGroup();
    }
  }

  initUser(id: string): void {
    this._userService.userEmitter.subscribe(usuario => {
      if (usuario && (usuario._id === id)) {
        this.usuario = usuario;
        this.isEdit = true;
        this.emailOrigen = this.usuario.email;
        this.initGroup();
        this.title = 'Edición de datos del usuario';
        this.button_label = 'Editar';
        this.ruta = ['dengue', 'usuario', 'dashboard'];
      }
    })
  }

  private initGroup(): void {
    this.form = this._fb.group({
      tipoDoc: [this.isEdit ? this.usuario.tipoDoc : 'DNI', Validators.required],
      ndoc: [this.isEdit ? this.usuario.ndoc : '', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10),
      Validators.pattern('[0-9]*')],
      ],
      numTramite: [
        this.isEdit ? this.usuario.numTramite : '',
        Validators.compose([Validators.pattern('[0-9]+'), Validators.minLength(11), Validators.maxLength(11), Validators.required]),
      ],
      fechaNacimiento: [this.isEdit ? new Date(this.usuario.fechaNacimiento) : '', Validators.required],
      telefono: [
        this.isEdit ? this.usuario.telefono : '',
        Validators.compose([Validators.pattern('[0-9]+'), Validators.required]),
      ],
      email: [this.isEdit ? this.usuario.email : '', [Validators.email, Validators.required], [this.emailExistenteValidator(this, this._userService, this.docBelongsTo)]],
      password: this.password,
      confirmPassword: this.confirmPassword,
      termscond: [null, Validators.requiredTrue],
      preguntaSecreta: [this.isEdit ? this.usuario.preguntaSecreta : '', Validators.required],
      respuestaSecreta: [this.isEdit ? this.usuario.respuestaSecreta : '', Validators.required],
      nombre: [this.isEdit ? this.usuario.nombre : '', Validators.required],
      apellido: [this.isEdit ? this.usuario.apellido : '', Validators.required]
    });

    if (this.usuario) {
      this.removeControl();
    } else {
      this.showForm = true;
      this.form.get('ndoc').setAsyncValidators(this.dniExistenteValidator(this, this._userService, this.docBelongsTo))
    }
  }

  removeControl(): void {
    this.form.removeControl('termscond');
    this.form.removeControl('password');
    this.form.removeControl('confirmPassword');
    this.form.get('tipoDoc').disable();
    this.form.get('ndoc').disable();
    this.form.get('ndoc').clearAsyncValidators();
    this.form.get('numTramite').disable();
    this.showForm = true;
  }

  verPassword(): void {
    const nodes = document.getElementsByClassName('password');
    for (let i = 0; i < nodes.length; i++) {
      const atributo = nodes[i].getAttribute('type');
      if (atributo === 'password') {
        nodes[i].setAttribute('type', 'text');
      } else {
        nodes[i].setAttribute('type', 'password');
      }
    }
    this.showPassword = this.showPassword ? false : true;
  }

  showInstructivo() {
    this._dialog.open(InstructivoNumTramiteModalComponent);
  }
  onSubmit(): void {
    // Primero seteamos la fecha
    let date = new Date(this.form.get('fechaNacimiento').value)
    let fecha_nacimiento_string = this.setFecha(date);
    let fvalue: RegistroUser = this.form.getRawValue();
    fvalue.fechaNacimiento = fecha_nacimiento_string;
    fvalue.tsFechaNacimiento = date.getTime();
    delete fvalue['termscond'];
    this.checkRegister(fvalue);
  }

  checkRegister(userAGNForm: RegistroUser): void {
    let user = new Usuario();
    Object.assign(user, userAGNForm);
    user.username = userAGNForm.email; //De momento el email será el usuario
    delete user['confirmPassword'];
    user.respuestaSecreta = this.eliminarDiacriticos(user.respuestaSecreta.toLowerCase());

    //Verificamos si estamos en modo edición o modo alta
    if (!this.isEdit) {
      this._userService.createUserAGN(user).then((user) => {
        this._notificacionService.success("Usuario registrado con éxito");
        this.volver();
      }).catch((err) => {
        this._notificacionService.error(
          "Se produjo un error al registrar usuario",
        );
      });
    }
    else {
      this._userService.updateDataUser(this.usuario._id, user).then(user => {
        this._notificacionService.success("Usuario editado con éxito");
        this._userService.userEmitter.next(user);
        this.volver();
      }).catch((err) => {
        this._notificacionService.error(
          "Se produjo un error al editar al usuario",
        );
      });
    }

  }

  eliminarDiacriticos(texto: string) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

  volver(): void {
    this._router.navigate(this.ruta);
  }

  setFecha(fecha: Date): string {
    return fecha.getFullYear() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getDate();
  }

  dniExistenteValidator(that: any, service: DengueUserService, message: object): AsyncValidatorFn {
    return ((control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      let value = control.value;
      let tdoc = that.form.controls['tipoDoc'].value || 'DNI';

      return service.testUserByDNI(tdoc, value).pipe(
        map(t => {
          let invalid = false;
          let txt = '';

          if (t && t.length) {
            invalid = true;
            txt = 'Documento existente: ' + t[0].nombre + ' ' + t[0].apellido;
          }

          message['error'] = txt;
          return invalid ? { 'mailerror': txt } : null;
        })
      )
    });
  }

  emailExistenteValidator(that: any, service: DengueUserService, message: object): AsyncValidatorFn {
    return ((control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      let value = control.value;

      return service.testUserByEmail(value).pipe(
        map(t => {
          let invalid = false;
          let txt = '';

          if (t && t.length) {
            if (t[0].email === this.emailOrigen) {
              invalid = false;
            } else {
              invalid = true;
              txt = 'Correo electrónico existente: ' + t[0].nombre + ' ' + t[0].apellido;
            }
          }

          message['error'] = txt;
          return invalid ? { 'mailerror': txt } : null;
        })
      )
    });

  }

  hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}

export class RegistroUser {
  username: string;
  telefono: number;
  ndoc: number;
  email: string;
  tipoDni: string;
  numTramite: number;
  fechaNacimiento: string;
  tsFechaNacimiento: number;
  password: string;
  preguntaSeguridad: string;
  respuestaSeguridad: string;
  nombre: string;
  apellido: string;
}
