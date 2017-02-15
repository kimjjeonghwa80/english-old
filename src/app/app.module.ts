import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { App } from '../providers/app';

import { AppComponent } from './app.component';
import { BackendAngularApiModule } from './../backend-angular-api/backend-angular-api.module';

import { HomePage } from '../pages/home/home';
import { HelpPage } from '../pages/help/help';
import { AdminPage } from '../pages/adminpage/adminpage';

import { HeaderComponent } from '../components/header/header';
import { BigHeaderComponent } from '../components/header/components/big-header/big-header';
import { SmallHeaderComponent } from '../components/header/components/small-header/small-header';
import { IntroComponent } from '../components/intro/intro';
import { ContactComponent } from '../components/contact/contact';
import { CurriculumComponent } from '../components/curriculum/curriculum';
import { PaymentComponent } from '../components/payment/payment';
import { TeacherComponent } from '../components/teacher/teacher';
import { LevelTestComponent } from '../components/level-test/level-test';
import { CommentComponent } from '../components/comment/comment';
import { InqueryComponent } from '../components/inquery/inquery';
import { ReservationComponent } from '../components/reservation/reservation';
import { FooterComponent } from '../components/footer/footer';
import { AsideComponent } from '../components/aside/aside';

import { LoginModal } from '../components/modals/login/login';
import { RegisterComponent } from '../components/modals/register/register';
import { ForgotPasswordComponent } from '../components/modals/forgot-password/forgot-password';
import { FindIdModal } from '../components/modals/find-id/find-id';
import { QnaPostComponent } from '../components/modals/qna_post/post';


import { LMS } from '../providers/lms';

const appRoutes: Routes = [
  { path: 'help', component: HelpPage },
  { path: '', component: HomePage },
  { path: 'adminpage', component: AdminPage }
];

@NgModule({
  declarations: [
    AppComponent,
    QnaPostComponent,
    HomePage,
    HelpPage,
    HeaderComponent,
    BigHeaderComponent,
    SmallHeaderComponent,
    LoginModal,
    RegisterComponent,
    IntroComponent,
    ContactComponent,
    CurriculumComponent,
    PaymentComponent,
    TeacherComponent,
    LevelTestComponent,
    CommentComponent,
    InqueryComponent,
    ReservationComponent,
    FooterComponent,
    AsideComponent,
    ForgotPasswordComponent,
    FindIdModal,

    AdminPage
  ],
  imports: [
    BrowserModule,
    HttpModule,

    RouterModule.forRoot( appRoutes, { useHash: !history.pushState }),
    NgbModule.forRoot(),
    FormsModule,
    BackendAngularApiModule
  ],
  bootstrap: [ AppComponent ],
  providers: [ App, NgbActiveModal, LMS ],

  entryComponents: [ 
    LoginModal, 
    RegisterComponent, 
    ForgotPasswordComponent, 
    FindIdModal,
    QnaPostComponent
    ]
})
export class AppModule {}


