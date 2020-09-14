import { NgModule } from '@angular/core';
import { AgnComponent } from './agn.component';
import { AgnRoutingModule } from './agn-routing.module';
import { VidaQueryPageComponent } from './vida-query/vida-query-page.component';
import { VidaQueryBrowseComponent } from './vida-query/vida-query-browse/vida-query-browse.component';
import { DevelarCommonsModule } from '../develar-commons/develar-commons.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VidaQueryListComponent } from './vida-query/vida-query-list/vida-query-list.component';
import { CommonModule } from '@angular/common';
import { VidaQueryViewComponent } from './vida-query/vida-query-view/vida-query-view.component';
import { VidaQueryService } from './vida-query/vida-query.service';
import { VidaQueryModalComponent } from './vida-query/vida-query-modal/vida-query-modal.component';
import { VidaQueryDetailedViewComponent } from './vida-query/vida-query-detailed-view/vida-query-detailed-view.component';
import { VidaQueryFiltroModalComponent } from './vida-query/vida-query-filtro-modal/vida-query-filtro-modal.component';

@NgModule({
    imports: [
      DevelarCommonsModule,
      ReactiveFormsModule,
      AgnRoutingModule,
      CommonModule
    ],
    declarations : [
      AgnComponent,
      VidaQueryPageComponent,
      VidaQueryBrowseComponent,
      VidaQueryListComponent,
      VidaQueryViewComponent,
      VidaQueryModalComponent,
      VidaQueryDetailedViewComponent,
      VidaQueryFiltroModalComponent
    ],
    exports: [
      VidaQueryPageComponent,
      VidaQueryPageComponent,
      VidaQueryBrowseComponent,
      VidaQueryListComponent,
      VidaQueryViewComponent,
      VidaQueryModalComponent,
      VidaQueryDetailedViewComponent
    ],
    entryComponents: [],
    providers: [VidaQueryService]
  })
  export class AgnModule { }
