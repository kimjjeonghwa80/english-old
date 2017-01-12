import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'login-component',
    templateUrl: 'login.html'
})

export class LoginModal{
    @Input() login;
    constructor( public activeModal: NgbActiveModal ){}

  onClickDismiss(){
    this.activeModal.dismiss( 'dismiss' );
  }
}