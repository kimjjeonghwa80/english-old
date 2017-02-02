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
    data;
    teachers: TEACHERS = null;
    constructor(
        testAll: TestAll,
        private user: User,
        public app: App,
        private lms: LMS
    ) {
        testAll.run();
        // this.getUserData()


        this.lms.getTeachers( teachers => this.teachers = teachers );

    }


    getUserData(){
    console.info('userid ' + this.user.loginUser.uid )
    this.user.private_get( this.user.loginUser.uid, res => {
        this.data = res;
        
    }, error => {
        console.log('error ::' + error ); 
    }, () =>{ 
        if( this.data ){
            this.getReservation();
        }
     });
    }

    getReservation(){
        this.lms.getReservations( this.data, res =>{
            
            console.log(' reservation :: HOME: ' + res[0].icon.replace(".", "http://onlineenglish.kr") );
        }, err =>{})
    }
    ngAfterViewInit() {
        console.log("HomePage::ngAfterViewInit() : ");   
    }
}
