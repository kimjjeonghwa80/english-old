import { Component, OnInit } from '@angular/core';
import { LMS } from '../../providers/lms';
import { User } from '../../angular-backend/user';
@Component({
    selector: 'reservation-component',
    templateUrl: 'reservation.html'
})
export class ReservationComponent implements OnInit {
    reservations: any;

    constructor(
        public user        : User,
        private lms : LMS
    ) {}
    ngOnInit() {

    }
    getReservation() {

    }

}