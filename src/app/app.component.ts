import { Component } from '@angular/core';
import { App } from '../providers/app';

import {Observable} from 'rxjs/Rx';

@Component({
  selector: `app-component`,
  template: `
    <router-outlet (window:resize)="onResize($event)"></router-outlet>
    <template ngbModalContainer></template>
  `
})
export class AppComponent {
  
  constructor( private app: App ) {
    app.setWidth( window.innerWidth );
    document.addEventListener("deviceready", () => this.onDevinceReady(), false);
  
    Observable.fromEvent(window, 'scroll')
          .debounceTime(100)
          .subscribe((event) => {
            console.log('Observable: scroll: ', event);
          });
  }
  onDevinceReady() {
    console.log("yes, I am running in cordova.");
  }
  
  onResize(event) {
    this.app.setWidth( window.innerWidth);
  }



}
