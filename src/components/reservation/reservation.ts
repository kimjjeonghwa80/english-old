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
    checkDate( data ):any{
        if(data['day'].length < 2) { data['day'] = "0"+data['day'];}
        let date = data['year']+data['month']+data['day'];
        for(let i=0; i < this.data.length ;i++) {
            if( date == this.data[i].date) return i;
        }
        return 0;
    }
    // getReservation() {

    // }

    listCalendar(month, year) {
        let running_day = new Date(year + "-" + month + "-01").getDay()
        let days_in_month = new Date(year, month, 0).getDate();
        for (let i = 0; i < running_day; i++) { this.listOfDays.unshift("" ); }     //Fill all the empty days first
        for (let i = 1; i <= days_in_month; i++) {
            let result;
            result = this.checkDate( { year:this.year, month:this.month, day:`${i}` });
            if( result != 0) {
                this.data[result].myDate = `${i}`;
                this.listOfDays.push( this.data[result]);
            }//if data is equals to today push
            else {
                this.listOfDays.push({myDate:i});
            }//else put empty object
        }       //Fill the days of month
        while( this.listOfDays.length < this.maxDay ) { this.listOfDays.push(""); } //fill the remaining days
        this.listOfDays = this.chunk(this.listOfDays,7);                            //Chunk Date
        
    }

//  listCalendar(month, year) {
//         let running_day = new Date(year + "-" + month + "-01").getDay()
//         let days_in_month = new Date(year, month, 0).getDate();
//         for (let i = 0; i < running_day; i++) { this.listOfDays.unshift("" ); }     //Fill all the empty days first
//         for (let i = 1; i <= days_in_month; i++) { this.listOfDays.push(i); }       //Fill the days of month
//         while( this.listOfDays.length < this.maxDay ) { this.listOfDays.push(""); } //fill the remaining days
//         this.listOfDays = this.chunk(this.listOfDays,7);                            //Chunk Date
//     }

    chunk(myArray:Array<any>, size) {
        let temp = myArray;
        myArray = [];
        for( let i = 0; i < temp.length; i = i + size ) {
            myArray.push(this.pres(temp.slice( i, i + size ) ));
        }
        return myArray;
    }
    pres( arr: any ) {
        // console.log('pres:', arr);
        return arr.map( e => this.pre(e) );
    }
    pre( data ) {
        return data;
    }
}