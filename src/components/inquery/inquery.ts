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
        let modalRef = this.modal.open( QnaPostComponent );
        modalRef.result.then( (x) => {
            //console.log( this.user.isLogin() );
            //this.login = this.user.isLogin();
            //console.log("user login status: ", this.login);
        }).catch( () => console.log('exit') );
    }
}