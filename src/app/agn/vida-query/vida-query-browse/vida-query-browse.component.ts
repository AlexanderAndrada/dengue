import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  CondicionBusqueda,
  buscarEnOptList,
  tipoBusquedaOptList,
  recursosOptList
} from "../models/browser.campos";

import { VidaQuery } from '../models/vidaQuery.model';


@Component({
  selector: "vida-query-browse",
  templateUrl: "./vida-query-browse.component.html",
  styleUrls: ["./vida-query-browse.component.scss"],
})
export class VidaQueryBrowseComponent implements OnInit, OnChanges {
  @Output()
  emitQuery: EventEmitter<any>;

  form: FormGroup;
  buscarEnOptList: CondicionBusqueda[] = buscarEnOptList;
  tipoBusquedaOptList: CondicionBusqueda[] = tipoBusquedaOptList;
  recursosOptList: CondicionBusqueda[] = recursosOptList;


  @Input()
  public query: VidaQuery;

  @Input()
  public browseEnable = false;

  constructor(private _fb: FormBuilder) {
    this.emitQuery = new EventEmitter<VidaQuery>();
  }

  ngOnInit(): void {
    this.initFormGroup();
  }


  ngOnChanges(): void {

  }

  private initFormGroup(): void {
    if(!this.query) this.query = new VidaQuery();
    this.form = this._fb.group({
      termino:      [(this.query && this.query.termino)      ? this.query.termino   : null, Validators.required],
      buscarEn:     [(this.query && this.query.buscarEn)     ? this.query.buscarEn  : null, Validators.required],
      tipoBusqueda: [(this.query && this.query.tipoBusqueda) ? this.query.tipoBusqueda : null],
      recurso:      [(this.query && this.query.recurso)      ? this.query.recurso   : '-1', Validators.required],
    });

    /*if (this.form.valid) {
      this.onSubmit();
    }*/
  }

  public onSubmit(): void {
    const fvalues = this.form.getRawValue();
    this.emitQuery.emit(fvalues);
  }

  public onChangeSelectionValue(type: string, val: any): void {
    console.log('onChangeSelectionValue: %s -> %s', type, val);
  }
}
