import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { App } from '../providers/app';

import { AppComponent } from './app.component';
//import { BackendAngularApiModule } from './../backend-angular-api/backend-angular-api.module';

import { AngularBackendModule } from './../angular-backend-0.2/angular-backend.module';

import { HomePage } from '../pages/home/home';
import { HelpPage } from '../pages/help/help';
import { AdminPage } from '../pages/adminpage/adminpage';

import { KkangHeaderComponent } from '../theme/kkang/kkang-header/kkang-header';
import { KkangFooterComponent } from '../theme/kkang/kkang-footer/kkang-footer';
import { KkangSmallHeaderComponent } from '../theme/kkang/kkang-header/components/kkang-small-header/kkang-small-header';
import { KkangBigHeaderComponent } from '../theme/kkang/kkang-header/components/kkang-big-header/kkang-big-header';

import { PlFooterComponent } from '../theme/plcenter/pl-footer/pl-footer';
import { PlHeaderComponent } from '../theme/plcenter/pl-header/pl-header';

import { PlSmallHeaderComponent } from '../theme/plcenter/pl-header/components/pl-small-header/pl-small-header';
import { PlBigHeaderComponent } from '../theme/plcenter/pl-header/components/pl-big-header/pl-big-header';
import { HeaderComponent } from '../components/header/header';
import { BigHeaderComponent } from '../components/header/components/big-header/big-header';
import { SmallHeaderComponent } from '../components/header/components/small-header/small-header';
import { IntroComponent } from '../components/intro/intro';
import { ContactComponent } from '../components/contact/contact';
import { ContactFormComponent} from '../components/contact/components/contact-form/contact-form';
import { ContactInformationComponent} from '../components/contact/components/contact-information/contact-information';
import { CurriculumComponent } from '../components/curriculum/curriculum';
import { PaymentComponent } from '../components/payment/payment';
import { TeacherComponent } from '../components/teacher/teacher';
import { LevelTestComponent } from '../components/level-test/level-test';
import { CommentComponent } from '../components/comment/comment';
import { InquiryComponent } from '../components/inquiry/inquiry';
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
    KkangHeaderComponent,
    KkangFooterComponent,
    KkangSmallHeaderComponent,
    KkangBigHeaderComponent,
    PlFooterComponent,
    PlHeaderComponent,
    PlSmallHeaderComponent,
    PlBigHeaderComponent,
    HeaderComponent,
    BigHeaderComponent,
    SmallHeaderComponent,
    ContactFormComponent,
    ContactInformationComponent,
    LoginModal,
    RegisterComponent,
    IntroComponent,
    ContactComponent,
    CurriculumComponent,
    PaymentComponent,
    TeacherComponent,
    LevelTestComponent,
    CommentComponent,
    InquiryComponent,
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
    AngularBackendModule
    //BackendAngularApiModule
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


