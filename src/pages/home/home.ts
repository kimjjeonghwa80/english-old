import { Component, AfterViewInit } from '@angular/core';
import { User } from '../../api/firebase-api-2.0/user';
import { TestAll } from '../../api/firebase-api-2.0/test/test-all';
import { App } from '../../providers/app';
import { LMS, TEACHERS } from '../../providers/lms';
@Component( {
    selector: 'home-page',
    templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
    login: boolean = false;
    data;
    teachers: TEACHERS = null;
    reservations;
    constructor(
        testAll: TestAll,
        private user: User,
        public app: App,
        private lms: LMS
    ) {
        // testAll.run();
        this.lms.getTeachers( teachers => this.teachers = teachers );
        console.log( 'check this user ::: ' + JSON.stringify(this.user.loginUser) );        
        if( this.user.loggedIn ) this.getReservation();

        this.listenevent();

    }

    listenevent(){
        this.app.myEvent.subscribe( item =>{
            if( item.eventType == 'loggedin'  ){
                setTimeout( () =>{
                    this.getReservation();
                }, 400);
            }
            if( item.eventType == 'loggedout') this.reservations = {};
        })
    }



    getUserData(){
        console.info('userid ' + this.user.loginUser.uid )
        this.user.private_get( this.user.loginUser.uid, res => {
            this.data = res;
            this.getReservation();
        }, error => {
            console.log('error ::' + error ); 
        }, () =>{
        });
    }

    getReservation(){
        this.lms.getReservations( this.user.loginUser, res =>{
            this.reservations = res;
            // console.log(' reservation :: HOME: ' + res[0].icon.replace(".", "http://onlineenglish.kr") );
        })
    }
    ngAfterViewInit() {
        console.log("HomePage::ngAfterViewInit() : ");   
    }
}
