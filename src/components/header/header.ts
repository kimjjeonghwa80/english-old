import { Component, OnInit, Inject  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModal } from '../modals/login/login'; 
import { RegisterComponent } from '../modals/register/register';
//import * as firebase from 'firebase';
import { User } from '../../api/firebase-api-2.0/user';
import { USER_REGISTRATION_FORM } from '../../api/firebase-api-2.0/interfaces';
import { App } from '../../providers/app';
import { DOCUMENT } from '@angular/platform-browser';
import { PageScrollService, PageScrollInstance, PageScrollConfig } from 'ng2-page-scroll';

@Component({
    selector: 'header-component',
    templateUrl: 'header.html'
})
export class HeaderComponent implements OnInit {
    random;
    ctr: number = 0;
    uid;
    userdata = <USER_REGISTRATION_FORM> {};
    more: boolean = false;
    constructor( 
        private modal       : NgbModal,
        // private ngZone      : NgZone,
        private user        : User,
        private app         : App,
        private pageScrollService: PageScrollService,
        @Inject(DOCUMENT) private document: Document
        ) {
            this.random = this.getRandomInit( 0, 9999999);
            this.userdata.name = 'guest' + this.random;            
        console.log('header :: constructor(), loginUser: ', user.loginUser);
        
        //this.checkLogin();
    }
    onClickLogin(){
        console.log('login');
        let modalRef = this.modal.open( LoginModal );
            modalRef.componentInstance.submit.subscribe( (uid) =>{
                console.log('emit' + uid);
            });
    }

    ngOnInit(){

    }
    renderUserData( data ) {
        this.userdata = data;
    }

    onClickRegister(){
        let modalRef = this.modal.open ( RegisterComponent );
        modalRef;
    }

    getUserData(){
        // this.userService.get( this.uid, response =>{
        //     this.renderUserData( response );
        // }, error => console.log('error on getting data ' + error ) ,
        // () => console.log('completed task ' ) )
    }

    checkLogin(){

        // this.userService.checklogin( res =>{
        //     this.ctr ++;
        //     console.log('counter ' + this.ctr);
        //     this.ngZone.run( () =>{
        //         this.isLoggedin = true;
        //         this.uid = res;
        //         this.getUserData();
        //         console.log('check response ' + JSON.stringify(res))
        //     })
        // }, error => {
        //     console.log( 'error ' + error );
        //     this.isLoggedin = false;
        // }, complete =>console.log( 'complete check ' ) )
    }

    getRandomInit( min, max ) {
        min = Math.ceil( min );
        max = Math.floor( max );
        return Math.floor( Math.random() * ( max - min ) ) + min;
    }

    onClickLogout() {

        // this.userService.logout( res =>{
        //     console.log('logged out');
        //     this.ngZone.run( () =>{
        //         this.isLoggedin = false;
        //     })
        // }, error => console.log('error ' + error ), 
        // () => console.log('complete ' ) )

    }


    onClickUpdateProfile(){
        let modalRef = this.modal.open( RegisterComponent );
            modalRef.componentInstance.uid = this.uid;
    }

    onClickMoreMenu() {
        this.more = ! this.more;
    }

    /**
     * ================= ScrollSpy + Affix ======================
     */

    onClickMenu( name ) {
        this.scrollTo( name );
    }
    onClickPanelMenu( name ) {
        this.more = false;
        this.scrollTo( name );
    }
    
    scrollTo( id ) {
        PageScrollConfig.defaultScrollOffset = this.app.marginTop;
        PageScrollConfig.defaultDuration = 300;
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#' + id);
        this.pageScrollService.start( pageScrollInstance );
    }

}
