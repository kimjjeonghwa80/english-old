import { Component, OnInit } from '@angular/core';
import { LMS } from '../../providers/lms';
import { User } from '../../angular-backend-0.2/user';
@Component({
    selector: 'reservation-component',
    templateUrl: 'reservation.html'
})
export class ReservationComponent implements OnInit {
    reservations: any;
    data:any = null;
    constructor(
        public user        : User,
        private lms : LMS
    ) {}
    ngOnInit() {
        this.lms.getReservations({data:"hello"},( res )=> {
            //Process gather data
            res.books.forEach((res)=>{
                if(  res.icon.match(/.\/data/g))  res.icon = res.icon.replace(/.\/data/g, 'https://englishfordevelopers.com/api/data');
            });
            
            this.data = res.books;
            console.log("Get Reservation Data:", this.data);
        });
    }
    getReservation() {

    }

}