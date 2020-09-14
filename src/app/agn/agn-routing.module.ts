import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgnComponent } from './agn.component';
import { VidaQueryPageComponent } from './vida-query/vida-query-page.component';
import { VidaQueryDetailedViewComponent } from './vida-query/vida-query-detailed-view/vida-query-detailed-view.component';

const routes = [{
    path: '',
    pathMatch: 'full',
    component: AgnComponent
},
{
  path: 'vida-query',
  pathMatch: 'full',
  component: VidaQueryPageComponent
},
{
  path: 'vida-query/:id',
  component: VidaQueryDetailedViewComponent
}
]

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
  })
  export class AgnRoutingModule {}