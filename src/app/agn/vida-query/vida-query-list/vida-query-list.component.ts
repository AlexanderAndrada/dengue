import { Component, ViewChild, OnInit, Output, EventEmitter, AfterViewChecked } from "@angular/core";
import { ArrayDataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { VidaQueryService } from '../vida-query.service';
import { AcervoDataList } from '../models/acervodatalist.model';


@Component({
    selector: 'vida-query-list',
    templateUrl : './vida-query-list.component.html',
    styleUrls : ['./vida-query-list.component.scss']
})
export class VidaQueryListComponent implements OnInit{

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @Output() emitEndRender : EventEmitter<boolean>;
    vidaQueryDataSource : ArrayDataSource<AcervoDataList>;
    vidaQueryList$ : BehaviorSubject<AcervoDataList[]>;
    vidaQueryList : any[] = [];
    viewCard : boolean = false;
    itemsLength : number = 0;

    constructor(private _dsCtrl : VidaQueryService){
        this.emitEndRender = new EventEmitter<boolean>();
        this.vidaQueryList$ = this._dsCtrl.vidaQueryDataSource;
    }

    ngOnInit() : void {
        this.initList();
    }


    initList() : void {
      this.vidaQueryDataSource = new VidaQueryDataSource(this.vidaQueryList$, this.paginator);
        this.viewCard = true;
        setTimeout(()=> {
            this.vidaQueryDataSource.connect().subscribe(list => {
              this.vidaQueryList = list as AcervoDataList[];


              if(this.vidaQueryList !== undefined){
                this.viewCard = true;
                this.itemsLength = this.vidaQueryList$.value.length;
              }
            })
            this.emitEndRender.emit(false);

          }, 1500);
    }


}

export class VidaQueryDataSource extends ArrayDataSource<AcervoDataList> {

    constructor(private sourceData: BehaviorSubject<AcervoDataList[]>,
                private _paginator: MatPaginator){
      super(sourceData);
    }

    connect(): Observable<any[]> {

      const displayDataChanges = [
        this.sourceData,
        this._paginator.page
      ];

      return merge(...displayDataChanges).pipe(
          map(() => {
            const data = this.sourceData.value.slice()

            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return data.splice(startIndex, this._paginator.pageSize);
          })
       );
    }

    disconnect() {}

  }
