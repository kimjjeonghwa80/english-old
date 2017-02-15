import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QnaPostComponent } from '../modals/qna_post/post';
@Component({
    selector: 'inquery-component',
    templateUrl: 'inquery.html'
})
export class InqueryComponent {

    constructor( private modal: NgbModal ) {}

    onClickPost() {
        this.modal.open( QnaPostComponent ).result.then( () => {
        }).catch( e => console.log('exit ' + e ) );
    }


}