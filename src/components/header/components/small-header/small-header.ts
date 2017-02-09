import { Component, Input, Output, EventEmitter } from '@angular/core';
import { App } from '../../../../providers/app';
import { User } from '../../../../api/firebase-api-2.0/user';
@Component({
    selector: 'small-header-component',
    templateUrl: 'small-header.html'
})
export class SmallHeaderComponent {
    event:any = {};
    more: boolean = false;
    @Input() login: boolean;
    @Output() logout = new EventEmitter();
    @Output() onLogin = new EventEmitter();
    @Output() register = new EventEmitter();
    @Output() profile = new EventEmitter();
    @Output() classroom = new EventEmitter();
    constructor(
        public app: App,
        private user: User
    ) {

    }

    onClickLogout(){
        this.logout.emit();
    }
    onClickUpdateProfile(){
        this.profile.emit();
    }


    onClickMoreMenu() {
        this.more = ! this.more;
    }
    onClickPanelMenu( name ) {
        this.more = false;
        this.app.scrollTo( name );
    }
    onClickLogin(){
        this.onLogin.emit();
    }
    onClickGotoClassRoom(){
        this.classroom.emit();
    }

    onClickRegister() {
        this.register.emit();
    }
}