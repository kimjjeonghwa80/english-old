import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../api/firebase-api-2.0/user';
import { App } from '../../../providers/app';

import { FindIdModal } from '../find-id/find-id';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password';
import { RegisterComponent } from '../register/register';

interface LOGIN_FORM {
  id     : string;
  password  : string;
}

@Component({
    selector: 'login-component',
    templateUrl: 'login.html'
})

export class LoginModal implements OnInit{
    saveid:boolean =false;
    form = <LOGIN_FORM> {};
    constructor( 
      public activeModal  : NgbActiveModal,
      private user : User,
      private app: App,
      private modal: NgbModal
      ){
          // this.onClickLogin();
      }

  onClickDismiss(){
    this.activeModal.close();
    if( ! this.saveid ) localStorage.removeItem('saveid');
  }


  onClickForgotPassword(){
      this.activeModal.close();
      this.modal.open( ForgotPasswordComponent )
  }

  onClickFindId(){
      this.activeModal.close();
      this.modal.open( FindIdModal );
  }
  

  onClickRegister(){
      this.activeModal.close();
      this.modal.open( RegisterComponent );
  }

  ngOnInit(){
      let id = localStorage.getItem('saveid');
      if( id ){
          this.form.id = id;
          this.saveid = true;
      }

  }

  onClickLogin(){
      
      //this.form.id = "user191559";
      //this.form.password = this.form.id;
      if( this.validate() == false ) return;

      // 1. get user email from user id.
      this.user.get( 'id/'+this.form.id, data => {
          console.log("user data: ", data);
          let uid = data['uid'];
          console.info('uid :: ' + uid );
              console.log('email node :: ' +  data );
              // 2. login with email/password
              this.user.login( data['email'], this.form.password, uid => {
                  this.activeModal.close();
                  if( this.saveid ) localStorage.setItem('saveid', this.form.id )
                  else localStorage.removeItem('saveid')
              },
              error => this.app.alert('login error: incorrect password'),
              () => {} );

      },
      error => this.app.alert( 'login error: Id does not exist'),
      () => {} );
      
  }

  onEnterLogin(event){
       if( event.keyCode == 13){
           this.onClickLogin();
       }
  }

  validate(){
      if( this.form.id.match(/[.#$\[\]]/g)) return this.validateError(' valid id ');
      if( ! this.form.id )return this.validateError( 'id ' );
      if( ! this.form.password ) return this.validateError( 'password ' );
      return true;
  }





  validateError( name ) {
      this.app.alert( name + ' is required ...' );
      return false;
  }


}