import { NgModule }                     from '@angular/core';
import { RouterModule, Routes }         from '@angular/router';
import { Page404Component }             from './develar-commons/errorpages/page-404.component';

const dengueModuleRoutes : Routes = [
  {
    path : '',
    loadChildren : () => import('./dengue/dengue.module').then( m => m.DengueModule)
  }
]


const routes: Routes = [
  {
    path: 'dengue',
    children : dengueModuleRoutes
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dengue'
  },
  {
    path: '**',
    component: Page404Component,
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: false , enableTracing: false}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
