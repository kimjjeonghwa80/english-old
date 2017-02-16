import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QnaPostComponent } from '../modals/qna_post/post';
@Component({
    selector: 'inquiry-component',
    templateUrl: 'inquiry.html'
})
export class InquiryComponent {

    constructor( private modal: NgbModal ) {}

    onClickPost() {
        this.modal.open( QnaPostComponent ).result.then( () => {
        }).catch( e => console.log('exit ' + e ) );
    }


}