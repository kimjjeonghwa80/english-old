import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { App } from '../../../providers/app';
import { User } from './../../../angular-backend/user';

import { FindIdModal } from '../find-id/find-id';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password';
import { RegisterComponent } from '../register/register';

import { USER_LOGIN_REQUEST_DATA } from './../../../angular-backend/interface';
@Component({
    selector: 'login-component',
    templateUrl: 'login.html'
})

export class LoginModal implements OnInit {
    loading: boolean = false;
    saveid:boolean = false;
    form = <USER_LOGIN_REQUEST_DATA> {};
    // form = {};
    constructor( 
      public activeModal  : NgbActiveModal,
      private app: App,
      private modal: NgbModal,
      private user : User
      ){
          // this.onClickLogin();
      }

  onClickDismiss(){
    this.activeModal.close();
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
      if( id ) {
          this.form['id'] = id;
          this.saveid = true;
      }

  }

  onClickLogin(){
      
        //this.form.id = "user191559";
        //this.form.password = this.form.id;
        //   if( this.validate() == false ) return;


        //   this.user.login( this.form, res =>{
        //     console.info( 'logged in :: login component :: ' + res );
        //       this.activeModal.close();
        //   }, err => console.error( ' failed to login ' + err ) );

       if ( this.validate() == false ) return;
        this.loading = true;
        this.user.login( this.form ).subscribe( re => {
            if ( this.user.base.isError( re ) ) 
            {
                this.loading = false;
                return this.user.base.errorHandler( re );
            }
            console.log("user login success: ", re );
            this.loading = false;
            this.activeModal.close();
        }, this.user.base.errorHandler );
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