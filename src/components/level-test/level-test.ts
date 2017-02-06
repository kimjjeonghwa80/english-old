import { Component } from '@angular/core';
import { Base } from '../../api/firebase-api-2.0/base';
import { App } from '../../providers/app';
interface form{
    studentid: string,
    studentname: string,
    date: string,
    time: string,
    mobile: string,
    kakao: string,
    content: string
}
@Component({
    selector: 'level-test-component',
    templateUrl: 'level-test.html'
})
export class LevelTestComponent {
    leveltestForm : form = <form>{}; 
    constructor(
        private base: Base,
        private app: App
    ){
    }

    onClickLevelTest(){
        if ( this.validate() == false) return;
        this.base.node('leveltest')
                 .create( undefined, this.leveltestForm , res =>{
                    console.info( ' successfully posted ' + res );
                    this.leveltestForm = <form> {};
                }, error => console.error ( ' error on posting leveltest form ' + error ) )
    }

    validate(){
        if( ! this.leveltestForm.mobile || this.leveltestForm.mobile.match(/^[a-zA-Z.#$\[\]_]/g) ){
            this.app.alert( ' valid mobile number is required ' );
            return false;
        }
        if( ! this.leveltestForm.studentid ) {
            this.app.alert( ' student id is required ' );
            return false;
        }
        if( ! this.leveltestForm.studentname ) {
            this.app.alert( ' student name is required ' );
            return false;
        }
        if( ! this.leveltestForm.date ) {
            this.app.alert( ' date is required ' );
            return false;
        }
        if( ! this.leveltestForm.time ) {
            this.app.alert( ' time is required ' );
            return false;
        }

        if( ! this.leveltestForm.kakao ) {
            this.app.alert( ' kakao talk is required ' );
            return false;
        }
        if( ! this.leveltestForm.content ){
            this.app.alert( ' content is requried ' );
            return false;
        }
        return true;
    }
}