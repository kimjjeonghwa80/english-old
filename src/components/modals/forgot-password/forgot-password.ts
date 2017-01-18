import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../api/firebase-api-2.0/user';


@Component({
    selector: 'forgotpassword-component',
    templateUrl: 'forgot-password.html'
})

export class ForgotPasswordComponent{


    email: string;
    constructor( 
        private activeModal : NgbActiveModal,
        private user        : User
        ){}
    onClickDismiss(){
        this.activeModal.close();
    }

    onClickResetPassword(){
        this.user.resetpassword( this.email , success =>{
            console.log( ' failed ' + success );
        }, fail =>{
            console.log( ' error ' + fail );
        }, complete =>{
            console.log( ' completed ' );
            this.activeModal.close();
        })
    }
}