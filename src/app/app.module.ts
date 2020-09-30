import { BrowserModule }                    from '@angular/platform-browser';
import { CommonModule }                     from '@angular/common';
import { NgModule, LOCALE_ID }                         from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule}                  from '@angular/common/http';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { NgbModule }                        from '@ng-bootstrap/ng-bootstrap';
import { DevelarCommonsModule }             from './develar-commons/develar-commons.module';
import { AppRoutingModule }                 from './app-routing.module';
import { AppComponent }                     from './app.component';
// Develar Components
import { UserService }                      from './entities/user/user.service';
import { SharedService }                    from './develar-commons/shared-service';
import { RouterModule }                     from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DevelarCommonsModule,
    AppRoutingModule,
    NgbModule,
    RouterModule
  ],

  declarations : [
    AppComponent
  ],

  entryComponents: [],
  bootstrap: [ AppComponent ],
  //providers: [ {provide: HTTP_INTERCEPTORS, useClass: InterceptHttpService, multi: true }, UserService, SharedService ]
  providers: [ UserService, SharedService, {
    provide: LOCALE_ID,
    useValue: 'es-AR'
  } ]

})

export class AppModule { }
