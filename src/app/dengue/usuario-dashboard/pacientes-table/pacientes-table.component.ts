import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { SelectionModel, DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-pacientes-table',
  templateUrl: './pacientes-table.component.html',
  styleUrls: ['./pacientes-table.component.scss']
})
export class PacientesTableComponent implements OnInit {

   // -----------------------------------------------------
  // Datos para mostrar que me los pasa TurnosBrowse
  @Input() data$: Observable<Usuario[]>;

  // -----------------------------------------------------
  // Emisor de evento de cancelación 
  @Output() cancelTurno: EventEmitter<string> = new EventEmitter<string>();

  public displayedColumns: string[] = [
    // 'select',
    'nombre',
    'ndoc',
    // 'tipoConsulta',
    // 'detalle',
    // 'estado',
    // 'rowactions'
  ];
  private initialSelection = [];
  private allowMultiSelect = true;
  public selection = new SelectionModel<Usuario>(this.allowMultiSelect, this.initialSelection);
  public dataSource: UsuariosDataSource;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new UsuariosDataSource(this.data$);
    this.dataSource.loadTurnos();
  }

  ngOnChanges(): void {
    if (this.dataSource) {
      this.dataSource.loadTurnos();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.turnosCountSubject.value;
    return numSelected === numRows;
  }


  masterToggle() {
    // this.isAllSelected() ?
    //     this.selection.clear() :
    //     this.dataSource.data.forEach(row => this.selection.select(row));
  }

  public editItem(usuario: Usuario): void {
  }

  public deleteItem(turno: Usuario): void {
    this.cancelTurno.emit(turno._id);
  }
}

class UsuariosDataSource implements DataSource<Usuario> {
  private turnosSubject = new BehaviorSubject<Usuario[]>([]);
  public turnosCountSubject = new BehaviorSubject<Number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private data$: Observable<Usuario[]>;
  public loading$ = this.loadingSubject.asObservable();


  constructor(
    data$: Observable<Usuario[]>,
  ) {
    this.data$ = data$;
  }

  connect(collectionViewer: CollectionViewer): Observable<Usuario[]> {
    return this.turnosSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.turnosSubject.complete();
    this.loadingSubject.complete();
  }

  // loadTurnos(personId: string, filter: string, sortDirection: string, pageIndex: number, pageSize: number) {
  loadTurnos() {
    this.loadingSubject.next(true);

    this.data$.pipe(
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(turnos => {
      this.turnosCountSubject.next(turnos.length);
      this.turnosSubject.next(turnos);
    });
  }
}