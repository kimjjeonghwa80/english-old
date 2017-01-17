import { Component, AfterViewInit } from '@angular/core';
import { User } from '../../api/firebase-api-2.0/user';
// import { UserTest } from '../../api/firebase-api-2.0/test/user-test';
import { App } from '../../providers/app';
@Component( {
    selector: 'home-page',
    templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
    
    constructor(
        // userTest: UserTest,
        private user: User,
        public app: App
    ) {
        
    }

    ngAfterViewInit() {
        console.log("HomePage::ngAfterViewInit() : ");   
    }
}