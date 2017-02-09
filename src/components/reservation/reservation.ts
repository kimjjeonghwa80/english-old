import { Component, OnInit } from '@angular/core';
import { LMS } from '../../providers/lms';
@Component({
    selector: 'reservation-component',
    templateUrl: 'reservation.html'
})
export class ReservationComponent implements OnInit {
    reservations: any;

    constructor(
        private lms : LMS
    ) {}
    ngOnInit() {

    }


}