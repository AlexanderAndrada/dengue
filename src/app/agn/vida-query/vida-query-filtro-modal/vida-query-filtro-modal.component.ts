import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VidaQueryService } from '../vida-query.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'vida-query-filtro-modal',
  templateUrl: './vida-query-filtro-modal.component.html',
  styleUrls: ['./vida-query-filtro-modal.component.scss']
})
export class VidaQueryFiltroModalComponent implements OnInit {

  filtro : any;
  aclararLogica : boolean = false;
  temas : string [] = [];
  temasGroup : FormGroup;
  constructor(public dialogRef: MatDialogRef<VidaQueryFiltroModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _vidaQueryService : VidaQueryService,
    private _fb : FormBuilder) {
    this.filtro = data.filtro;
    if(this.filtro.tipoFiltro === 'year'){
      this.filtro.data = this.filtro.data.substring(this.filtro.data.length - 4);
    }else if(this.filtro.tipoFiltro === 'term_tema'){
      this.initGroup();
      this.temas = this.filtro.data.split(',');
    }
   }

  ngOnInit(): void {
  }

  initGroup(){
    this.temasGroup = this._fb.group({
      temaSeleccionado : ['',Validators.required]
    })
  }

  agregarLogica(logica : string){
    let filtro = {
      term : this.filtro.data,
      indice : this.filtro.tipoFiltro,
      tipo : 'exact',
      logica : logica
    }
    if(this.filtro.tipoFiltro === 'term_tema'){
      filtro.term = this.temasGroup.get('temaSeleccionado').value;
    }
    this._vidaQueryService.addFiltroDeBusqueda(filtro);
    this.dialogRef.close();
  }

  exect(confirmacion : boolean){

    if(confirmacion){
      this.aclararLogica = true;
    }else{
      this.dialogRef.close();
    }
  }

}
