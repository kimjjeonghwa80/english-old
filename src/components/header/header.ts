import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModal } from '../modals/login/login';
import { RegisterComponent } from '../modals/register/register';

import { App } from '../../providers/app';

@Component({
    selector: 'header-component',
    templateUrl: 'header.html'
})
export class HeaderComponent implements OnInit {
    event:any = {};
    random;
    ctr: number = 0;
    uid;

    @Output() onLogin = new EventEmitter();
    @Output() onLogout = new EventEmitter();

    more: boolean = false;
    login: boolean = false;
    constructor(
        private modal       : NgbModal,
        private app         : App
    ) {
        // userTest.run();
        // console.log('header :: constructor(), loginUser: ', user.loginUser);
        // this.login = user.loggedIn;
        // console.log("user login status: ", this.login);
    }
    ngOnInit() {

    }
    onClickLogin(){
        console.log('login');
        let modalRef = this.modal.open( LoginModal );

        // modalRef.result.then( (x) => {
        //     console.log( this.user.loginUser );
        //     this.login = this.user.loggedIn;
        //     console.log("user login status: ", this.login);
        //     if( this.login ) {
        //         // this.event.eventType = "loggedin";
        //         // this.app.myEvent.emit(this.event);
        //         this.onLogin.emit();
        //     }
        // }).catch( () => console.log('exit') );

    }
    onClickGotoClassRoom(){
        // window.open(
        //     `https://video.withcenter.com/room/${this.user.loginUser.name}/testroom`,
        //     '_blank'
        // );
    }

    onClickRegister() {
        let modalRef = this.modal.open ( RegisterComponent );
        modalRef.result.then( (x) => {
            console.log( this.user.loginUser );
            this.login = this.user.loggedIn;
            console.log("user login status: ", this.login);
        }).catch( () =>console.log('exit '));
    }





    onClickLogout() {
        //this.login = false;
        // this.user.logout( () => {
        //         console.info('user login status: ', this.login);
        //         if( ! this.user.login ){
        //             // this.event.eventType = "loggedout";
        //             // this.app.myEvent.emit(this.event);
        //             this.onLogout.emit();
        //         }
        //     },
        //     (e) => console.error('logout error: ', e),
        //     () => {} );
    }


    onClickUpdateProfile(){
        // console.log('uid ' + JSON.stringify(this.user.loginUser));
        // let modalRef = this.modal.open( RegisterComponent );
        // modalRef.result.then(() => {}).catch( () =>console.log('exit '));
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
