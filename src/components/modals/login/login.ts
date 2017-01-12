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
        this.userService.login( this.login_form.email, this.login_form.password, uid => {
            console.log("Login ok: ", uid);
            this.submit.emit( uid );
        },
        error => {
            console.error("Login error: ", error );
        });
  }


}