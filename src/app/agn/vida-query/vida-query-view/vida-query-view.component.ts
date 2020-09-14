import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { VidaQueryModalComponent } from '../vida-query-modal/vida-query-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AcervoDataList } from '../models/acervodatalist.model';
import { VideoJsPlayerOptions } from 'video.js';
import { VidaQueryFiltroModalComponent } from '../vida-query-filtro-modal/vida-query-filtro-modal.component';
import { VidaQueryHelper } from '../vida-query.helper';
import { Router } from '@angular/router';
import { ResTypesEnum, ThemeTypesEnum } from '../models/types.enum';

@Component({
  selector: 'vida-query-view',
  templateUrl: './vida-query-view.component.html',
  styleUrls: ['./vida-query-view.component.scss']
})
export class VidaQueryViewComponent implements OnInit {

  @Input() archive : AcervoDataList;
  public primerRenglon : string;
  public archiveId: string;
  public feFilmacion: string;
  public feGrabacion: string;
  public recursoDigital: string;
  public legajo: string;

/* Define si se muestra o no información ampliada */
  public showMore = false;


  constructor(private _dialog : MatDialog,
    private _router : Router) {
  }

  ngOnInit(): void {
    this.initData()


  }

  private initData(){
    this.primerRenglon = this.archive.id_externo+' :: ';
    let fecha_filmacion : string = this.archive.fecha_filmacion !== '' ? "Fecha de Filmación: "+this.archive.fecha_filmacion : null;
    let fecha_grabacion : string = this.archive.fecha_grabacion !== '' ? "Fecha de Grabación: "+this.archive.fecha_grabacion : null;

    if(fecha_filmacion){
      this.primerRenglon += fecha_filmacion+' :: ';

    }else if(fecha_grabacion){
      this.primerRenglon += fecha_grabacion+ ' :: ';
    }

    let recurso = VidaQueryHelper.getRecursoListByID(this.archive.id_tipo_recurso);
    if( this.archive.legajo){
      this.primerRenglon += 'Legajo: '+this.archive.legajo+' :: '
    }
    if(recurso){
      this.primerRenglon += 'Recurso: '+recurso;
    }

    this.archiveId = this.archive.id_externo || '';
    this.feFilmacion = this.archive.fecha_filmacion !== '' ? "Filmación: "+this.archive.fecha_filmacion : null;
    this.feGrabacion = this.archive.fecha_grabacion !== '' ? "Grabación: "+this.archive.fecha_grabacion : null;
    this.recursoDigital = VidaQueryHelper.getRecursoListByID(this.archive.id_tipo_recurso);
    this.legajo = (this.archive.legajo )? 'Legajo: '+this.archive.legajo : '';


  }

  public navegarAVistaDetallada() : void{
    this._router.navigate(['/agn/vida-query/', this.archive.id]);
  }

  public playMedia(source: string, sourceType: number, titulo: string): void {
    // 'https://vjs.zencdn.net/v/oceans.mp4'
    //'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3'
    let opciones: VideoJsPlayerOptions;
    console.log('PlayMedia: [%s] [%s] ',source, sourceType);

    if (sourceType === ResTypesEnum.RESTYPE_VIDEO) {
      opciones = {
        controls: true,
        fluid: true,
        preload: 'none',
        sources: [{ src: source, type: 'video/mp4' }]}
    
    } else if (sourceType === ResTypesEnum.RESTYPE_AUDIO ){
      opciones = {
        controls: true,
        autoplay: false,
        fluid: true,
        loop: false,
        src: source ,
        plugins: {
          wavesurfer: {
              backend: 'MediaElement',
              //debug: true,
              waveColor: 'gray',
              progressColor: 'white',
              cursorColor: 'white',
              hideScrollbar: true,
              barWidth: 2,
              barHeight: 1,
              barGap: null,
              scrollParent: true
          }
        }
      }
    }

    const dialogRef = this._dialog.open(VidaQueryModalComponent, {
      width: '800px',
      data: { opciones: opciones, tituloModal: titulo },
      panelClass: 'vida-query-view-modal'
    });


    dialogRef.afterClosed().subscribe(result => {});

  }

  public onToggleShowMore(): void {
    this.showMore = !this.showMore;
  }
}
