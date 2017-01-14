import { Component } from '@angular/core';
import { App } from '../providers/app';
@Component({
  selector: `app-component`,
  template: `
    <router-outlet (window:resize)="onResize($event)"></router-outlet>
    <template ngbModalContainer></template>
  `
})
export class AppComponent {
  
  constructor( private app: App ) {
    document.addEventListener("deviceready", () => this.onDevinceReady(), false);
  }
  onDevinceReady() {
    console.log("yes, I am running in cordova.");
  }
  
  onResize(event) {
    this.app.setWidth( window.innerWidth);
  }

}
