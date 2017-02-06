import { Component } from '@angular/core';
import { Base } from '../../api/firebase-api-2.0/base';
import { App } from '../../providers/app';
interface form{
    name: string,
    email: string,
    mobile: string,
    content: string
}
@Component({
    selector: 'contact-component',
    templateUrl: 'contact.html'
})
export class ContactComponent {

    contactForm : form = <form> {}
    constructor(
        private base: Base,
        private app : App
    ){}

    onClickInquire(){
        if( this.validate() == false ) return;
        this.base.node( 'Inquiries' )
                 .create( undefined, this.contactForm , res =>{
                    console.info( ' successfully posted inquiry ' );
                 }, error => console.error( ' error on posting inquiry ' + error ) )
    }

    validate(){
        if( ! this.contactForm.name ){
            this.app.alert( ' name is required ' );
            return false;
        }
        if( ! this.contactForm.email ){
            this.app.alert( ' email is required ' );
            return false;
        }
        if( ! this.contactForm.mobile || this.contactForm.mobile.match(/^[a-zA-Z.#$\[\]_]/g) ) {
            this.app.alert( ' valid mobile is required ' );
            return false;
        }
        if( ! this.contactForm.content ){
            this.app.alert( ' content is required ' );
            return false;
        }
        return true;
    }
}