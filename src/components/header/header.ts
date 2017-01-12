import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModal } from '../modals/login/login'; 
@Component({
    selector: 'header-component',
    templateUrl: 'header.html'
})
export class HeaderComponent {

    constructor( private modal: NgbModal ) {
    }
    onClickLogin(){
        console.log('login');
        let modalRef = this.modal.open( LoginModal );
            modalRef.componentInstance.login = 'World';
    }
    onClickRegister(){
    }       
}