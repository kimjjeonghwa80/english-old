import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../api/firebase-api-2.0/user';
import { App } from '../../../providers/app';

interface LOGIN_FORM {
  id     : string;
  password  : string;
}

@Component({
    selector: 'login-component',
    templateUrl: 'login.html'
})

export class LoginModal{

    form = <LOGIN_FORM> {};
    constructor( 
      public activeModal  : NgbActiveModal,
      private user : User,
      private app: App
      ){
          // this.onClickLogin();
      }

  onClickDismiss(){
    this.activeModal.dismiss( 'dismiss' );
  }

  onClickLogin(){

      //this.form.id = "user191559";
      //this.form.password = this.form.id;
      if( this.validate() == false ) return;

      // 1. get user email from user id.
      this.user.get( this.form.id, data => {
          console.log("user data: ", data);
          let uid = data['uid'];
          this.user.get( uid, data => {
              console.log( data );
              // 2. login with email/password
              this.user.login( data['email'], this.form.password, uid => {
                  this.activeModal.close();
              },
              error => this.app.alert('login error: login failed'),
              () => {} );
          },
          error => this.app.alert( 'login error: failed to get user info' ),
          () => {} );
      },
      error => this.app.alert( 'login error: failed to get user uid'),
      () => {} );
      
  }

  validate(){
      
      if( ! this.form.id ){
          alert( 'Please provide your registered email' );
          return false;
      }
      if( this.form.password == '' || this.form.password == null ){
          alert( 'Password is required' );
          return false;
      }
      return true;
  }


}