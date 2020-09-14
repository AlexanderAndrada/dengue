import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { VidaQueryService } from "./vida-query.service";
import { VidaQuery } from "./models/vidaQuery.model";
import { NotificationService } from '../../develar-commons/notifications.service';

@Component({
  selector: "vida-query-page",
  templateUrl: "./vida-query-page.component.html",
  styleUrls: ["./vida-query-page.component.scss"],
})
export class VidaQueryPageComponent implements OnInit, AfterViewChecked {
  public showList = false;

  /* Almacena la última query realizada, de manera que no se pierda al navegar entre páginas
   * y retornar al buscador
   */
  public query: VidaQuery;

  public data$ = new BehaviorSubject<any>({});
  public searching = false;

  constructor(
    private _snackBarService: NotificationService,
    private _dsCtrl: VidaQueryService,
    private _cdRef: ChangeDetectorRef) {
        this.query = this._dsCtrl.query;
        if(this._dsCtrl.vidaQueryDataSource.value.length > 0){
          this.showList = true;
          this.searching = true;
        }
  }

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
    this._cdRef.detectChanges();
  }

  showView(event: VidaQuery): void {
    this.query = {
      recurso: event.recurso,
      logica: event.logica,
      termino: event.termino,
      buscarEn: event.buscarEn,
      tipoBusqueda: event.tipoBusqueda,
    };
    this.searching = true;
    this._dsCtrl.fetchVidaByQuery(this.query).subscribe({
      next: (list) => {
        if (list && list.length) {
          this.data$.next(list);
          //this.searching = false;
          this.showList = true;
        } else {
          //this.searching = false;
          this.showList = false;
          this._snackBarService.warn("No se han encontrado resultados para la búsqueda");
        }
        setTimeout(()=> this.searching = false, 1000);
      },
      error: (err) => {
        this.searching = false;
        console.log("Oppps!!! Algo salió mal");
        this._snackBarService.error('Se ha producido un error al realizar la búsqueda');
      },
    });
  }

  endSearching(e : boolean) : void {
    this.searching = e;
  }
}
