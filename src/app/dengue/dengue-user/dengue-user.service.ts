import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { DaoService } from "../../develar-commons/dao.service";
import { Usuario } from '../models/usuario';

const RECORD = "dengueUser";

@Injectable({
  providedIn: "root",
})
export class DengueUserService {
  private isLogIn = false;
  private hasLogout = false;
  private usersUrl = "api/dengue/usuarios"; // URL to web api

  private userApiFetchPerson = 'api/dengue/usuario/%s/persona';

  private headers = new HttpHeaders().set("Content-Type", "application/json");
  private _currentUser: Usuario;
  private _userEmitter: BehaviorSubject<Usuario>;
  constructor(
    private _router: Router,
    private http: HttpClient,
    private daoService: DaoService,
  ) {
    this._userEmitter = new BehaviorSubject( new Usuario());
  }

  login(user: any): Promise<Usuario> {
    const url = `${this.usersUrl}/${"login"}`;
    this.hasLogout = false;
    return this.http
      .post(url, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .catch(this.loginError);
  }

  logout(): Promise<any> {
    let url = `${this.usersUrl}/logout`;
    this.isLogIn = false;
    this.hasLogout = true;
    this._currentUser = null;
    this._userEmitter.next(this._currentUser);
    return this.http.get(url)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {

    return Promise.reject(error.message || error);
  }

  private loginError(error: any): Promise<any> {
    this.isLogIn = false;
    this.hasLogout = false;
    return Promise.reject(
      {
        message:
          "loginError: fallo en la autenticación, el usuario o la clave son incorrectas",
      },
    );
  }

  get userlogged(): boolean {
    return this.isLogIn;
  }

  initLoginUser() {
    let fetchedUser: Usuario;
    let loggedIn = false;
    let loginUser = new Subject<Usuario>();

    this.loadLoginUser().then((res) => {
      console.log(res)
      fetchedUser = res as Usuario;
      loggedIn = (fetchedUser && fetchedUser._id) ? true : false;

      if (!loggedIn) {
        setTimeout(() => {
          this.loadLoginUser().then((res) => {

      console.log(res)
            fetchedUser = res as Usuario;
            loggedIn = (fetchedUser && fetchedUser._id) ? true : false;

            if (!loggedIn) {
              // Lo redirigimos a la pantalla principal
              this._router.navigateByUrl("");
            } else {
              this.setLoginUser(fetchedUser, loginUser);
            }
          });
        }, 2000);
      } else {
        this.setLoginUser(fetchedUser, loginUser);
      }
    })
      .catch(this.handleError);

    return loginUser;
  }

  loadLoginUser() {
    const url = `${this.usersUrl}/${"currentuser"}`;
    return this.http
      .get(url)
      .toPromise();
  }

  setLoginUser(user: Usuario, loginUser: Subject<Usuario>) {
    this._currentUser = user;
    this.isLogIn = true;
    this.hasLogout = false;
    loginUser.next(this._currentUser);
    this._userEmitter.next(this._currentUser);
  }

  get userEmitter(): BehaviorSubject<Usuario> {
    return this._userEmitter;
  }

  get currentUser(): Usuario {
    return this._currentUser;
  }

  createUserAGN(user: Usuario): Promise<Usuario> {
    return this.daoService.create(RECORD, user);
  }

  resetPassword(datos : any) : Promise<any> {
    const url = this.usersUrl+'/resetpassword';
    return this.http.post(url, JSON.stringify(datos), {headers : this.headers}).toPromise().catch();
  }

  updateDataUser(id : string, data : Usuario) : Promise<Usuario> {
    return this.http.put<Usuario>('api/dengue/usuario/'+id,data, {headers : this.headers}).toPromise().catch();
  }

}
