import { Component, NgZone, OnInit  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModal } from '../modals/login/login'; 
import { RegisterComponent } from '../modals/register/register';
import * as firebase from 'firebase';
import { User } from '../../api/firebase-api-2.0/user';
interface data{
    email       : string;
    firstname   : string;
    lastname    : string;
    gender      : string;
    birthdate   : Date;
}
@Component({
    selector: 'header-component',
    templateUrl: 'header.html'
})
export class HeaderComponent implements OnInit {
    random
    ctr: number = 0;
    isLoggedin:boolean = false;
    uid;
    userdata = <data>{};
    constructor( 
        private modal       : NgbModal,
        private ngZone      : NgZone,
        private userService : User 
        ) {
            this.random = this.getRandomInit( 0, 9999999);
            this.userdata.firstname = 'guest' + this.random;            
        console.log('header :: constructor()')
        this.checkLogin();
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
    renderUserData( data ){
        this.userdata = data;
    }
    onClickRegister(){
        let modalRef = this.modal.open ( RegisterComponent ); 
    }

    getUserData(){
        this.userService.get( this.uid, response =>{
            this.renderUserData( response );
        }, error => console.log('error on getting data ' + error ) ,
        () => console.log('completed task ' ) )
    }

    checkLogin(){

        this.userService.checklogin( res =>{
            this.ctr ++;
            console.log('counter ' + this.ctr);
            this.ngZone.run( () =>{
                this.isLoggedin = true;
                this.uid = res;
                this.getUserData();
                console.log('check response ' + JSON.stringify(res))
            })
        }, error => {
            console.log( 'error ' + error );
            this.isLoggedin = false;
        }, complete =>console.log( 'complete check ' ) )
    }

    getRandomInit( min, max ){
        min = Math.ceil( min );
        max = Math.floor( max );
        return Math.floor( Math.random() * ( max - min ) ) + min;
    }

    onClickLogout(){
        this.userService.logout( res =>{
            console.log('logged out');
            this.ngZone.run( () =>{
                this.isLoggedin = false;
            })
        }, error => console.log('error ' + error ), 
        () => console.log('complete ' ) )
    }


    onClickUpdateProfile(){
        let modalRef = this.modal.open( RegisterComponent );
            modalRef.componentInstance.uid = this.uid;
    }
           
}