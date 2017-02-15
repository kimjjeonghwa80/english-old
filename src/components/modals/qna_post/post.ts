import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { App } from '../../../providers/app';

@Component({
    selector: 'qna-post-component',
    templateUrl: 'post.html'
})

export class QnaPostComponent implements OnInit {


    constructor(  public activeModal  : NgbActiveModal ) {}


    ngOnInit() {}

    onClickDismiss(){
        this.activeModal.close();
    }
}