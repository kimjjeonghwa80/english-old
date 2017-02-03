import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../api/firebase-api-2.0/user';
import { LMS } from '../../providers/lms';
@Component({
    selector: 'reservation-component',
    templateUrl: 'reservation.html'
})
export class ReservationComponent implements OnInit {

    @Input() reservations;
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

}