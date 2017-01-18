import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { App } from '../providers/app';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { FirebaseApiModule } from '../api/firebase-api-2.0/firebase-api-module';
import { AppComponent } from './app.component';

import { HomePage } from '../pages/home/home';
import { HelpPage } from '../pages/help/help';
import { AdminPage } from '../pages/adminpage/adminpage';

import { HeaderComponent } from '../components/header/header';
import { IntroComponent } from '../components/intro/intro';
import { ContactComponent } from '../components/contact/contact';
import { CurriculumComponent } from '../components/curriculum/curriculum';
import { PaymentComponent } from '../components/payment/payment';
import { TeacherComponent } from '../components/teacher/teacher';

import { LoginModal } from '../components/modals/login/login';
import { RegisterComponent } from '../components/modals/register/register';
import { ForgotPasswordComponent } from '../components/modals/forgot-password/forgot-password';
import { FindIdModal } from '../components/modals/find-id/find-id';

const appRoutes: Routes = [
  { path: 'help', component: HelpPage },
  { path: '', component: HomePage },
  { path: 'adminpage', component: AdminPage }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    HelpPage,
    HeaderComponent,
    LoginModal,
    RegisterComponent,
    IntroComponent,
    ContactComponent,
    CurriculumComponent,
    PaymentComponent,
    TeacherComponent,
    ForgotPasswordComponent,
    FindIdModal,
    AdminPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot( appRoutes, { useHash: Boolean(history.pushState) === false }),
    FirebaseApiModule,
    NgbModule.forRoot(),
    FormsModule,
    Ng2PageScrollModule.forRoot()
  ],
  bootstrap: [ AppComponent ],
  providers: [ App, NgbActiveModal ],

  entryComponents: [ 
    LoginModal, 
    RegisterComponent, 
    ForgotPasswordComponent, 
    FindIdModal 
    ]
})
export class AppModule {}


