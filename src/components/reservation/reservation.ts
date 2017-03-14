import { Component, OnInit } from '@angular/core';
import { LMS } from '../../providers/lms';
import { User } from '../../angular-backend/user';
@Component({
    selector: 'reservation-component',
    templateUrl: 'reservation.html'
})
export class ReservationComponent implements OnInit {
    reservations: any;
    data:any = null;
    maxDay:number = 35;
    listOfDays:Array<any> = [];
    date:any = new Date();
    year:any = this.date.getFullYear();
    month:any = ("0" + (this.date.getMonth() + 1)).slice(-2);
    testList:any = [];
    constructor(
        public user        : User,
        private lms : LMS
    ) {}
    ngOnInit() {
        
        this.lms.getReservationsByMonthYear( { m:this.month , Y:this.year }, ( res )=> {
            //Process gather data
            res.books.forEach((res)=>{
                if(  res.icon.match(/.\/data/g))  res.icon = res.icon.replace(/.\/data/g, 'https://englishfordevelopers.com/api/data');
            });
            
            this.data = res.books;
            console.log("Get Reservation Data:", this.data);
            this.listCalendar( this.month, this.year);
            console.log("Get listOfDays Data:", this.listOfDays);
        });
      
    }



    listCalendar(month, year) {
        let empty_day = new Date(year + "-" + month + "-01").getDay()   // first date(day) of the month. 0~6
        let days_in_month = new Date(year, month, 0).getDate();         // last date(day) of the month. 28, 29, 30.
        for (let i = 0; i < empty_day; i++) { this.listOfDays.unshift( "" ); }     // Fill all the empty days first
        for (let i = 1; i <= days_in_month; i++) {

            let date = this.year + this.month + (i < 10 ? '0' + i : i);
            let book = this.data.find( book => book['date'] == date );
            if ( book ) book['myDate'] = i;
            else book = { myDate: i };
            this.listOfDays.push( book );

        }       //Fill the days of month
        // console.info('debug:', this.listOfDays);
        while( this.listOfDays.length < this.maxDay ) { this.listOfDays.push(""); } // fill the remaining days
        this.listOfDays = this.chunk(this.listOfDays );                            //Chunk Date
    }
    

    chunk( arr:Array<any> ) {
        let temp = [];
        for( let i = 0; i < arr.length; i = i + 7 ) {
            temp.push( this.pres( arr.slice( i, i + 7 ) ) );
        }
        return temp;
    }

    pres( arr: any ) {
        // console.log('pres:', arr);
        return arr.map( e => this.pre(e) );
    }
    pre( data ) {
        return data;
    }


    onClickNext() {

    }
    onClickPrev() {

    }
}