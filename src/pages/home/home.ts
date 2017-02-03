import { Component, AfterViewInit } from '@angular/core';
import { User } from '../../api/firebase-api-2.0/user';
import { TestAll } from '../../api/firebase-api-2.0/test/test-all';
import { App } from '../../providers/app';
import { LMS, TEACHERS } from '../../providers/lms';
@Component( {
    selector: 'home-page',
    templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
    
    teachers: TEACHERS = null;
    constructor(
        testAll: TestAll,
        private user: User,
        public app: App,
        private lms: LMS
    ) {
        testAll.run();


        this.lms.getTeachers( teachers => this.teachers = teachers );

    }

    ngAfterViewInit() {
        console.log("HomePage::ngAfterViewInit() : ");   
    }
}
