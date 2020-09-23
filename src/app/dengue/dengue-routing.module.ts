import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DenguePageComponent } from './dengue-page/dengue-page.component';
import { RegistrarUserComponent } from './dengue-user/registrar-user/registrar-user.component';
import { RecuperarPasswordUserComponent } from './dengue-user/recuperar-password-user/recuperar-password-user.component';
import { IngresarUserComponent } from './dengue-user/ingresar-user/ingresar-user.component';
import { UsuarioDashboardComponent } from './usuario-dashboard/usuario-dashboard.component';
import { UsuarioDashboardMainComponent } from './usuario-dashboard/usuario-dashboard-main/usuario-dashboard-main.component';


const routes: Routes = [
  {
    path: '',
    component: DenguePageComponent
  },
  {
    path: 'ingresar',
    component: IngresarUserComponent
  },
  {
    path: 'registrarse',
    component: RegistrarUserComponent
  },
  {
    path: 'recuperar',
    component: RecuperarPasswordUserComponent
  },
  {
    path: 'usuario/dashboard',
    // pathMatch: 'full',
    component: UsuarioDashboardComponent,
    children: [
      {
        path: 'datos/:id',
        // pathMatch: 'full',
        component: RegistrarUserComponent,
      
      },
      {
        path: '',
        pathMatch: 'full',
        component: UsuarioDashboardMainComponent
      }
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DengueRoutingModule { }
