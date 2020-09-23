import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-datos-dashboard',
  templateUrl: './user-datos-dashboard.component.html',
  styleUrls: ['./user-datos-dashboard.component.scss']
})
export class UserDatosDashboardComponent implements OnInit {

  @Input() public title: string;
  @Input() public subtitle : string;
  @Input() public user$: BehaviorSubject<Usuario>; 
  id : string;
  constructor(
    private _router: Router) { }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      this.id = user._id;
    })
  }


  goToEditUserData() : void {
    this._router.navigate(['dengue','usuario','dashboard','datos',this.id])
  }

}