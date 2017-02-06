import { Component, OnInit } from '@angular/core';
import { User, KEY_LOGIN_USER_DATA } from '../../api/firebase-api-2.0/user';
import { LMS } from '../../providers/lms';
@Component({
    selector: 'reservation-component',
    templateUrl: 'reservation.html'
})
export class ReservationComponent implements OnInit {

    reservations: any;
    constructor(
        private user : User,
        private lms  : LMS
    ){

    }

    ngOnInit(){
        
    }

    ngOnChanges(changes){
        if( changes['reservations']){
            
            console.log('got reservations ');
        }
    }


    getReservation() {
        this.reservations = null;

        let data = this.user.getLoginUserData();
        console.log( 'user data', data );
        this.lms.getReservations( data, res => {
            this.reservations = res;
            console.log(' reservation :: HOME: ' + res[0].icon.replace(".", "http://onlineenglish.kr") );
        });
    }
}
