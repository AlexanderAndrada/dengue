import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject, Observable } from "rxjs";
import { DaoService } from "../../develar-commons/dao.service";
import { Acervo } from "./models/acervo.model";
import { VidaQueryHelper } from "./vida-query.helper";
import { VidaQuery } from './models/vidaQuery.model';
import { NotificationService } from '../../develar-commons/notifications.service';
import { AcervoDataList } from './models/acervodatalist.model';

const RECORD = "vida";

@Injectable()
export class VidaQueryService {
  private emitVidaQueryDataSource = new BehaviorSubject<any[]>([]);
  private onUpdateFiltrosSubject: Subject<any> = new Subject<any>();
  onUpdateFiltrosObservable$: Observable<any> = this.onUpdateFiltrosSubject
    .asObservable();

  acervosList: Acervo[] = [];

  /* Almacena la última query realizada, de manera que no se pierda al navegar entre páginas
   * y retornar al buscador
   */
  public query: VidaQuery;


  constructor(private _daoService: DaoService,
    private _snackBarService : NotificationService) {
    this.query = new VidaQuery();
  }

  fetchVidaByQuery(query: any): Subject<any[]> {
    let listener = new Subject<any[]>();

    this.query = query;

    this.loadVidaByQuery(listener, query);
    return listener;
  }

  addFiltroDeBusqueda(filtro: any) {
    this.onUpdateFiltrosSubject.next(filtro);
  }

  private loadVidaByQuery(listener: Subject<any[]>, query) {
    this._daoService.search<Acervo>(RECORD, query).subscribe({next: (list) => {
      if (list && list.length) {
        this.acervosList = list;
        this.updateDataSource();
      } else {
        this.acervosList = [];
      }
      listener.next(this.acervosList);
    },
  error: err => {
    this._snackBarService.error("Se ha producido un error inesperado");
  }});
  }

  get vidaQueryDataSource(): BehaviorSubject<any[]> {
    return this.emitVidaQueryDataSource;
  }

  fetchVidaById(id: string): Subject<any> {
    let listener = new Subject<any>();
    this.loadVidaById(listener, id);
    return listener;
  }

  loadVidaById(listener: Subject<any>, id: string) {
    let url_id = "/acervo/" + id;
    this._daoService.findById(RECORD, url_id).then((acervo) => {
      listener.next(acervo);
    });
  }

  updateDataSource() {
    let data = VidaQueryHelper.buildDataList(this.acervosList);
    this.emitVidaQueryDataSource.next(data);
  }


}
