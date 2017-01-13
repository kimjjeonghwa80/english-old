import { Component, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../api/firebase-api-2.0/user';


interface login{
  email     : string;
  password  : string;
}

@Component({
    selector: 'login-component',
    templateUrl: 'login.html'
})

export class LoginModal{

    login_form: login = <login>{};
    @Output() submit = new EventEmitter();
    constructor( 
      public activeModal  : NgbActiveModal,
      private userService : User
      ){}

  onClickDismiss(){
    this.activeModal.dismiss( 'dismiss' );
  }

  onClickLogin(){
      if( this.validate() == false ) return;
        this.userService.login( this.login_form.email, this.login_form.password, uid => {
            console.log("Login ok: ", uid);
            this.submit.emit( uid );
            this.activeModal.close();
        },
        error => {
            alert("Login error: " + error );
        });
  }

  validate(){
      if( this.login_form.email == '' || this.login_form.email == null ){
          alert( 'Please provide your registered email' );
          return false;
      }
      if( this.login_form.password == '' || this.login_form.password == null ){
          alert( 'Password is required' );
          return false;
      }
      return true;
  }


}