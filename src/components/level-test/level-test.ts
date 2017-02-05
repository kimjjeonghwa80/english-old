import { Component } from '@angular/core';
import { Base } from '../../api/firebase-api-2.0/base';
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
        private base: Base
    ){
    }

    onClickLevelTest(){
        if ( this.validate() == false) return alert('error on mobile');
        this.base.node('leveltest')
                 .create( undefined, this.leveltestForm , res =>{
                    console.info( ' successfully posted ' + res );
                }, error => console.error ( ' error on posting leveltest form ' + error ) )
    }

    validate(){
        if(  this.leveltestForm.mobile.match(/^[a-zA-Z.#$\[\]_]/g) ){
            return false;
        }
        if( ! this.leveltestForm.studentid ) return false;
        if( ! this.leveltestForm.studentname ) return false;
        if( ! this.leveltestForm.date ) return false;
        if( ! this.leveltestForm.time ) return false;
        if( ! this.leveltestForm.mobile ) return false;
        if( ! this.leveltestForm.kakao ) return false;
        if( ! this.leveltestForm.content ) return false;
        return true;
    }
}