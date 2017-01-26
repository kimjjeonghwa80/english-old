import { Component, AfterViewInit } from '@angular/core';
import { User } from '../../api/firebase-api-2.0/user';
import { TestAll } from '../../api/firebase-api-2.0/test/test-all';
import { App } from '../../providers/app';
@Component( {
    selector: 'home-page',
    templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
    
    constructor(
        testAll: TestAll,
        private user: User,
        public app: App
    ) {
        testAll.run();
        
    }

    ngAfterViewInit() {
        console.log("HomePage::ngAfterViewInit() : ");   
    }
}
