import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Forum } from '../../../backend-angular-api/forum';
// import { FORUM_DATA_REQUEST_DATA } from '../../../backend-angular-api/interface';
import { App } from '../../../providers/app';

@Component({
    selector: 'qna-post-component',
    templateUrl: 'post.html'
})

export class QnaPostComponent implements OnInit {
    // form: FORUM_DATA_REQUEST_DATA = <FORUM_DATA_REQUEST_DATA> {}

    constructor(
        private activeModal  : NgbActiveModal,
        private app          : App,
        // private forum        : Forum
    ) {}


    ngOnInit() {}

    onClickDismiss(){
        this.activeModal.close();
    }

    onClickPost() {
        // this.forum.create( this.form, res =>{
        //     console.info('success' + JSON.stringify( res ) );
        //     this.activeModal.close();
        // }, error => console.error('error posting ' + error ) )
    }
}