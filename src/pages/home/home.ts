import { Component } from '@angular/core';
import { User } from '../../api/firebase-api-2.0/user';
//import { UserTest } from '../../api/firebase-api-2.0/test/user-test';
@Component( {
    selector: 'home-page',
    templateUrl: 'home.html'
})
export class HomePage {
    constructor(
        // userTest: UserTest,
        private user: User
        ) {
    }
}