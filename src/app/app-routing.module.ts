import { NgModule }                     from '@angular/core';
import { RouterModule, Routes }         from '@angular/router';
//Develar tests
import { GcseComponent }                from './develar-commons/gcse/gcse.component';
import { CrawlerComponent }             from './develar-commons/crawler/crawler.component';
import { UploadComponent }              from './develar-commons/upload/upload.component';
import { AssetcreateComponent }         from './develar-commons/assets/assetcreate/assetcreate.component';
import { FoldercreateComponent }        from './develar-commons/folders/foldercreate/foldercreate.component';
import { FolderBrowseComponent }        from './develar-commons/folders/folder-browse/folder-browse.component';
import { TagComponent }                 from './develar-commons/tags/tags/tags.component';
import { ChipsDemo }                    from './develar-commons/tags/tags/chip.demo';
//Layouts
import { DefaultLayoutComponent }       from './develar-commons/layouts/default/default.component';
import { ExtraLayoutComponent }         from './develar-commons/layouts/extra/extra.component';
import { PresentacionLayoutComponent }  from './develar-commons/layouts/presentacion/presentacion.component';
import { WorkgroupLayoutComponent }     from './develar-commons/layouts/workgroup/workgroup.component';
//import { MinimalistLayoutComponent }    from './site-minimal/layouts/minimalist/minimalist.component';
// Error pages
import { Page404Component }             from './develar-commons/errorpages/page-404.component';
//import { Page500Component }             from './develar-commons/errorpages/page-500.component';
// Components 
import { CommunityCreateComponent }     from './develar-commons/community/community-create/community-create.component';
import { EnterSiteComponent }            from './develar-commons/enter-site/enter-site.component';


const defaultAdminRoute: Routes = [
  {
    path: '',
    component: CommunityCreateComponent ,
    pathMatch: 'full'
  },
];

const communityRoutes: Routes = [
  { path: '', component: CommunityCreateComponent },
];

const personModuleRoutes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./entities/person/person.module').then(m => m.PersonModule)
  },
];

const userModuleRoutes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./entities/user/user/user.module').then(m => m.UserModule)
  },
];

const locacionModuleRoutes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./entities/locaciones/locacion.module').then(m => m.LocacionHospitalariaModule)
  },
];

const productModuleRoutes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./entities/products/product.module').then(m => m.ProductModule)
  },
];

const bookshelfModuleRoutes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./bookshelf/bookshelf.module').then(m => m.BookshelfModule)
  },
];

const entityRoutes: Routes = [
  { path: 'personas',    children:  personModuleRoutes },
  { path: 'productos',   children:  productModuleRoutes },
  { path: 'usuarios',    children:  userModuleRoutes },
  { path: 'locaciones',  children:  locacionModuleRoutes },
];

const afterLogin: Routes = [
  { path: '',          component:  EnterSiteComponent },
];

const loginModuleRoutes: Routes = [
  {
    path: '', 
    loadChildren: () => import('./entities/user/login/login.module').then(m => m.LoginModule)
  }
];

const notificationModuleRoutes: Routes = [
  {
    path: '', 
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)
  }
];

const agnModuleRoutes : Routes = [
  {
    path : '',
    loadChildren : () => import('./agn/agn.module').then( m => m.AgnModule)
  }
]

const webRoutes: Routes = [
  {
    path: '',
    component: PresentacionLayoutComponent,
    children: agnModuleRoutes
  },
];


const adminRoutes: Routes = [
  {
    path: 'fichas',
    component: DefaultLayoutComponent,
    children: bookshelfModuleRoutes
  },
  {
    path: 'presentacion',
    component: PresentacionLayoutComponent,
    children: bookshelfModuleRoutes
  },
  {
    path: 'entidades',
    component: DefaultLayoutComponent,
    children: entityRoutes
  },
  {
    path: 'proyectos',
    component: WorkgroupLayoutComponent,
    children: bookshelfModuleRoutes
  },
  {
    path: 'notificaciones',
    component: DefaultLayoutComponent,
    children: notificationModuleRoutes
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: defaultAdminRoute
  },
];

const mainRoutes:Routes = [
  {
    path: 'gestion',
    children: adminRoutes
  },
  { 
    path: '', 
    loadChildren: () => import('./site-minimal/minimal.module').then(m => m.MinimalModule)
  },

];


const develarRoutes:Routes = [
  {
    path: 'comunidades',
    component: DefaultLayoutComponent,
    children: communityRoutes
  },
  {
    path: '',
    children: adminRoutes
  },

];


const routes: Routes = [
  {
    path: 'develar',
    children: develarRoutes
  },
  {
    path: 'ingresar',
    component: ExtraLayoutComponent,
    children: loginModuleRoutes
  },
  {
    path: 'ingresando',
    component: ExtraLayoutComponent,
    children: afterLogin
  },
  {
    path: 'web',
    children: webRoutes
  },
  {
    path: 'agn',
    component: DefaultLayoutComponent,
    children : agnModuleRoutes
  },
  {
    path: '',
    children: mainRoutes,
    pathMatch: 'full'
  },
  {
    path: ':community',
    children: mainRoutes
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
