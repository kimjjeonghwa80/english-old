import { Component, NgZone  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModal } from '../modals/login/login'; 
import { RegisterComponent } from '../modals/register/register';
import * as firebase from 'firebase';
import { User } from '../../api/firebase-api-2.0/user';
@Component({
    selector: 'header-component',
    templateUrl: 'header.html'
})
export class HeaderComponent {
    isLoggedin:boolean = false;
    userData;
    constructor( 
        private modal       : NgbModal,
        private ngZone      : NgZone,
        private userService : User 
        ) {
        console.log('header :: constructor()')
        this.checkLogin();
    }
    onClickLogin(){
        console.log('login');
        let modalRef = this.modal.open( LoginModal );
            modalRef.componentInstance.submit.subscribe( (uid) =>{
                console.log('emit' + uid);
            })
    }
    onClickRegister(){
        let modalRef = this.modal.open ( RegisterComponent );  

    }

    checkLogin(){
        let user = firebase.auth().currentUser;
        firebase.auth().onAuthStateChanged((user) => {
            this.ngZone.run( () => {
                if (user) {
                    this.isLoggedin = true;
                    this.getUser( user.uid);
                    return;
                }
                this.isLoggedin = false;
            });     
        });
    }


    getUser( uid,  ) {
        this.userService.get( uid, user => {
            console.log('getUser: success: ', user );
            this.ngZone.run( () =>{
                this.userData = user;
            })
        },
        e => console.error("failed", e ),
        () => console.log("complete callback") );
    }


    onClickLogout(){
        this.userService.logout( res =>{
            console.log('logged out')
        }, error => console.log('error ' + error ), 
        () => console.log('complete ' ) )
    }


    onClickUpdateProfile(){
        let modalRef = this.modal.open( RegisterComponent );
            modalRef.componentInstance.userdata = this.userData;
    }
           
}