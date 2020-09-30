import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lista-hospitales',
  templateUrl: './lista-hospitales.component.html',
  styleUrls: ['./lista-hospitales.component.scss']
})
export class ListaHospitalesComponent implements OnInit {

  title: string = 'Hospitales';
  subtitle : string = 'Consulta los hospitales disponibles';
  constructor(private _router : Router) {
    
   }

  ngOnInit(): void {
  }

  goToList() : void {

  }

}
