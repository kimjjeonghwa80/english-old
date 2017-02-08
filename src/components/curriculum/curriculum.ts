import { Component } from '@angular/core';
import * as _ from 'lodash';
import * as xInterface from '../../app/app.interface';
@Component({
    selector: 'curriculum-component',
    templateUrl: 'curriculum.html'
})
export class CurriculumComponent {
    temp:any = [];
    showBook:boolean = false;
    bookList:xInterface.BOOKLIST = xInterface.bookList;
    constructor() {
        this.takeSomeTemporaryBooks();
    }
    takeSomeTemporaryBooks() {
        this.temp = this.bookList.books;
        this.bookList.books = _.take( this.bookList.books, 8);
    }
    onClickShowMore() {
        this.showBook =!this.showBook;
        if(this.showBook) {
            this.bookList.books = this.temp;
        }
        else {
            this.takeSomeTemporaryBooks();
        }
    }
}