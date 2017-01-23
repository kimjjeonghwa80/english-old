import { Component, Renderer  } from '@angular/core';
import { User } from '../../api/firebase-api-2.0/user';
import { App } from '../../providers/app';
import { Router } from '@angular/router';
import * as _ from 'lodash';


@Component({
    selector: 'admin-page',
    templateUrl: 'adminpage.html'
})

export class AdminPage{
    noMorePosts: boolean = false;
    inPageLoading:boolean = false;
    scrollListener = null;
    scrollCount = 0;
    users = [];
    constructor(
        private user : User,
        private router: Router,
        private renderer: Renderer,
        private app : App
    ){
        this.checkAuth();
        this.getUsers();
        this.beginScroll();
    }


    checkAuth(){
        if(! this.user.loggedIn ){
            this.router.navigate(['']);
            console.log('is logged in ? ' + this.user.loggedIn )  
        }
    }


    displayUsers( data? ){
    console.log('data ' + JSON.stringify(data))
    if ( Object.keys(data).length <= 0 ) {
        // this.noMorePosts = true;
        return;
    }
    console.log('got more')
    for( let key of Object.keys(data) ) {
        // if( ! key.match(/[+ -]/g) ) 
        this.users.push ( {'key':key, 'values':data[key]} );
      
      // this.searchedItem.push( {key: key, value: data[key]} );
    }
    }

    
    getUsers(){

        if( this.noMorePosts == true) return;
        if ( this.inPageLoading ) {
        console.info("in page loading");
        return;
        }
        this.inPageLoading = true;
        this.user.page( 'user/metadata' , res =>{
            console.log('res :' + JSON.stringify(res));
            this.displayUsers( res );
            // this.inPageLoading = false;
        }, error =>{
            console.log('error :: ' + error );
            this.app.alert( error )
        }, () => this.inPageLoading = false )
    }
    

   onClickDeleteUser(){
       
   }


  beginScroll() {
    this.scrollListener = this.renderer.listenGlobal( 'document', 'scroll', _.debounce( () => this.pageScrolled(), 200));
  }
  endScroll() {
    if ( this.scrollListener ) this.scrollListener();
  }
  pageScrolled() {
    let pages = document.querySelector(".pages");
    if ( pages === void 0 || ! pages || pages['offsetTop'] === void 0) return; // @attention this is error handling for some reason, especially on first loading of each forum, it creates "'offsetTop' of undefined" error.
    let pagesHeight = pages['offsetTop'] + pages['clientHeight'];
    let pageOffset = window.pageYOffset + window.innerHeight;
    if( pageOffset > pagesHeight - 200) { // page scrolled. the distance to the bottom is within 200 px from
      console.log("page scroll reaches at bottom: pageOffset=" + pageOffset + ", pagesHeight=" + pagesHeight);
      this.getUsers();
    }
  }

  /**
   *
   * @description end scroll on destroy.
   *
   */
  ngOnDestroy() {
    this.endScroll();
  }


}