import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacientes-dashboard',
  templateUrl: './pacientes-dashboard.component.html',
  styleUrls: ['./pacientes-dashboard.component.scss']
})
export class PacientesDashboardComponent implements OnInit {

  title : string = 'Lista de pacientes';
  subtitle : string = 'Consulta los pacientes disponibles'
  constructor(private _router : Router) { }

  ngOnInit(): void {
  }

  goToPacientesList() : void { 
    this._router.navigate(['dengue','usuario','dashboard','pacientes'])
  }

}
