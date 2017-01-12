import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FirebaseApiModule } from '../api/firebase-api-2.0/firebase-api-module';
import { AppComponent } from './app.component';

import { HomePage } from '../pages/home/home';
import { HelpPage } from '../pages/help/help';

import { HeaderComponent } from '../components/header/header';

import { LoginModal } from '../components/modals/login/login';

const appRoutes: Routes = [
  { path: 'help', component: HelpPage },
  { path: '', component: HomePage }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    HelpPage,
    HeaderComponent,
    LoginModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot( appRoutes ),
    FirebaseApiModule,
    NgbModule.forRoot()
  ],
  bootstrap: [ AppComponent ],
  providers: [ NgbActiveModal ],
  entryComponents: [ LoginModal ]
})
export class AppModule {}


