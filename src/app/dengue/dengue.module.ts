import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DengueRoutingModule } from './dengue-routing.module';
import { IngresarUserComponent } from './dengue-user/ingresar-user/ingresar-user.component';
import { RegistrarUserComponent } from './dengue-user/registrar-user/registrar-user.component';
import { RecuperarPasswordUserComponent } from './dengue-user/recuperar-password-user/recuperar-password-user.component';
import { DenguePageComponent } from './dengue-page/dengue-page.component';
import { DevelarCommonsModule } from '../develar-commons/develar-commons.module';
import { DevelarMaterialModule } from '../develar-commons/develar-materials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioDashboardComponent } from './usuario-dashboard/usuario-dashboard.component';
import { UsuarioHeaderComponent } from './usuario-header/usuario-header.component';
import { UsuarioDashboardMainComponent } from './usuario-dashboard/usuario-dashboard-main/usuario-dashboard-main.component';
import { UserDatosDashboardComponent } from './usuario-dashboard/user-datos-dashboard/user-datos-dashboard.component';
import { FormSintomasComponent } from './usuario-dashboard/form-sintomas/form-sintomas.component';
import { ListaHospitalesComponent } from './usuario-dashboard/lista-hospitales/lista-hospitales.component';


@NgModule({
  declarations: [IngresarUserComponent, RegistrarUserComponent,
     RecuperarPasswordUserComponent, DenguePageComponent, UsuarioDashboardComponent, 
     UsuarioHeaderComponent, UsuarioDashboardMainComponent, UserDatosDashboardComponent, FormSintomasComponent, ListaHospitalesComponent],
  imports: [
    CommonModule,
    DengueRoutingModule,
    DevelarCommonsModule,
    ReactiveFormsModule,
    DevelarMaterialModule
  ]
})
export class DengueModule { }
