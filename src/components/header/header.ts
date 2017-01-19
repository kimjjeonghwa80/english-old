import { Component, OnInit  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModal } from '../modals/login/login'; 
import { RegisterComponent } from '../modals/register/register';
//import * as firebase from 'firebase';
import { User } from '../../api/firebase-api-2.0/user';
import { UserTest } from '../../api/firebase-api-2.0/test/user-test';
// import { USER_REGISTRATION_FORM } from '../../api/firebase-api-2.0/interfaces';
import { App } from '../../providers/app';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
    selector: 'header-component',
    templateUrl: 'header.html'
})
export class HeaderComponent implements OnInit {
    random;
    ctr: number = 0;
    uid;
    
    more: boolean = false;
    login: boolean = false;
    constructor( 
        private modal       : NgbModal,
        private user        : User,
        private userTest    : UserTest,
        private app         : App
    ) {
        // userTest.run();
        console.log('header :: constructor(), loginUser: ', user.loginUser);
        this.login = user.loggedIn;
        console.log("user login status: ", this.login);
        
        //console.log(user.loggedIn);
        //console.log(user);
        // this.onClickRegister();

        // this.onClickLogin();
    }
    onClickLogin(){
        console.log('login');
        let modalRef = this.modal.open( LoginModal );
        
        modalRef.result.then( (x) => {
            console.log( this.user.loginUser );
            this.login = this.user.loggedIn;
            console.log("user login status: ", this.login);
        });

    }

    ngOnInit() {

    }
    
    onClickRegister() {
        let modalRef = this.modal.open ( RegisterComponent );
        modalRef.result.then( (x) => {
            console.log( this.user.loginUser );
            this.login = this.user.loggedIn;
            console.log("user login status: ", this.login);
        });
    }





    onClickLogout() {
        this.login = false;
        this.user.logout( () => {
            console.info('user login status: ', this.login);
        },
        (e) => console.error('logout error: ', e),
        () => {} );
    }


    onClickUpdateProfile(){
        console.log('uid ' + JSON.stringify(this.user.loginUser));
        let modalRef = this.modal.open( RegisterComponent );
            modalRef.result.then(() => {});
    }

    onClickMoreMenu() {
        this.more = ! this.more;
    }

    /**
     * ================= ScrollSpy + Affix ======================
     */

    onClickMenu( name ) {
        this.app.scrollTo( name );
    }

    onClickPanelMenu( name ) {
        this.more = false;
        this.app.scrollTo( name );
    }
    

}
