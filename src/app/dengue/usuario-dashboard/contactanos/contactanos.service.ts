import { Injectable } from "@angular/core";
import { DaoService } from '../../../develar-commons/dao.service';
import { Reporte } from '../../models/reporte';
import { Observable } from 'rxjs';

const RECORD = 'reportes';
@Injectable({
    providedIn: 'root'
})
export class ContactanosService {

    constructor(private _daoService : DaoService){

    }

    findAll () : Promise<Reporte[]> {
        return this._daoService.findAll<Reporte>(RECORD)
    }

    insert (reporte : Reporte) : Promise<Reporte> {
        return this._daoService.create<Reporte>(RECORD, reporte);
    }

    findByQuery (query : any) : Observable<Reporte[]> {
        return this._daoService.search<Reporte>(RECORD, query);
    }
}