import { Component, OnInit } from '@angular/core';
import { User } from '../../api/firebase-api-2.0/user';
import { LMS } from '../../providers/lms';
@Component({
    selector: 'reservation-component',
    templateUrl: 'reservation.html'
})
export class ReservationComponent implements OnInit {

    userdata;
    reservations;
    constructor(
        private user : User,
        private lms  : LMS
    ){
        
    }

    ngOnInit(){
        if( this.user.loggedIn ) this.getUserData();
    }

    getUserData(){
    console.info('userid ' + this.user.loginUser.uid )
    this.user.private_get( this.user.loginUser.uid, res => {
        this.userdata = res;
        
    }, error => {
        console.log('error ::' + error ); 
    }, () =>{ 
        if( this.userdata ){
            this.getReservation();
        }
     });
    }

    getReservation(){
        this.lms.getReservations( this.userdata, res =>{
            
            console.log(' reservation :: HOME: ' + res[0].icon.match("./+") );

            this.reservations = res;
        }, err =>{})
    }

}