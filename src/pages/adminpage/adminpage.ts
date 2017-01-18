import { Component } from '@angular/core';
import { User } from '../../api/firebase-api-2.0/user';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-page',
    templateUrl: 'adminpage.html'
})

export class AdminPage{


    constructor(
        private user : User,
        private router: Router
    ){
        if(! this.user.loggedIn){
            this.router.navigate([''])
        }
    }



    getUsers(){
        this.user
    }


}